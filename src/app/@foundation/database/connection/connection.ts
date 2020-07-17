import { Driver, Logger, QbjectType } from '..';
import { Repository, TreeRepository } from '../repository';
import { EntitySubscriberInterface } from '../subscriber';
import { EntityManager, EntityManagerFactory, SqljsEntityManager } from '../entity-manager';
import { DefaultNamingStrategy, NamingStrategyInterface } from '../naming-strategy';
import {
  CannotConnectAlreadyConnectedError,
  CannotExecuteNotConnectedError,
  EntityMetadataNotFoundError,
  QueryRunnerProviderAlreadyReleasedError,
} from '../error';
import { EntityMetadata } from '../metadata';
import { Migration, MigrationExecutor, MigrationInterface } from '../migration';
import { EntityMetadataValidator } from '../metadata-builder';
import { ConnectionOptions } from './connection-options';
import { DriverFactory } from '../driver/driver-factory';
import { ConnectionMetadataBuilder } from './connection-metadata-builder';
import { QueryRunner } from '../query-runner';
import { RelationIdLoader, RelationLoader, SelectQueryBuilder } from '../query-builder';
import { LoggerFactory } from '../logger/logger-factory';
import { QueryResultCacheFactory } from '../cache/query-result-cache-factory';
import { QueryResultCache } from '../cache/query-result-cache';
import { EntitySchema } from '../';
import { ObjectUtils } from '../util';
import { IsolationLevel } from '../driver/types';
import { DriverUtils } from '../driver/driver-utils';

/**
 * Connection is a single database ORM connection to a specific database.
 * Its not required to be a database connection, depend on database type it can create connection pool.
 * You can have multiple connections to multiple databases in your application.
 */
export class Connection {

  // -------------------------------------------------------------------------
  // Public Readonly Properties
  // -------------------------------------------------------------------------

  /**
   * Connection name.
   */
  readonly name: string;

  /**
   * Connection options.
   */
  readonly options: ConnectionOptions;

  /**
   * Indicates if connection is initialized or not.
   */
  readonly isConnected: boolean;

  /**
   * Database driver used by this connection.
   */
  readonly driver: Driver;

  /**
   * EntityManager of this connection.
   */
  readonly manager: EntityManager;

  /**
   * Naming strategy used in the connection.
   */
  readonly namingStrategy: NamingStrategyInterface;

  /**
   * Logger used to log orm events.
   */
  readonly logger: Logger;

  /**
   * Migration instances that are registered for this connection.
   */
  readonly migrations: MigrationInterface[] = [];

  /**
   * Entity subscriber instances that are registered for this connection.
   */
  readonly subscribers: EntitySubscriberInterface<any>[] = [];

  /**
   * All entity metadatas that are registered for this connection.
   */
  readonly entityMetadatas: EntityMetadata[] = [];

  /**
   * Used to work with query result cache.
   */
  readonly queryResultCache?: QueryResultCache;

  /**
   * Used to load relations and work with lazy relations.
   */
  readonly relationLoader: RelationLoader;

  /**
   * Used to load relation ids of specific entity relations.
   */
  readonly relationIdLoader: RelationIdLoader;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(options: ConnectionOptions) {
    this.name = options.name || 'default';
    this.options = options;
    this.logger = new LoggerFactory().create(this.options.logger, this.options.logging);
    this.driver = new DriverFactory().create(this);
    this.manager = this.createEntityManager();
    this.namingStrategy = options.namingStrategy || new DefaultNamingStrategy();
    this.queryResultCache = options.cache ? new QueryResultCacheFactory(this).create() : undefined;
    this.relationLoader = new RelationLoader(this);
    this.relationIdLoader = new RelationIdLoader(this);
    this.isConnected = false;
  }

  // -------------------------------------------------------------------------
  // Public Accessors
  // -------------------------------------------------------------------------

  /**
   * Gets a sql.js specific Entity Manager that allows to perform special load and save operations
   *
   * Available only in connection with the sqljs driver.
   */
  get sqljsManager(): SqljsEntityManager {
    if (!(this.manager instanceof SqljsEntityManager))
      throw new Error(`SqljsEntityManager is only available for Sqljs databases.`);

    return this.manager as SqljsEntityManager;
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Performs connection to the database.
   * This method should be called once on application bootstrap.
   * This method not necessarily creates database connection (depend on database type),
   * but it also can setup a connection pool with database to use.
   */
  async connect(): Promise<this> {
    if (this.isConnected)
      throw new CannotConnectAlreadyConnectedError(this.name);

    // connect to the database via its driver
    await this.driver.connect();

    // connect to the cache-specific database if cache is enabled
    if (this.queryResultCache)
      await this.queryResultCache.connect();

    // set connected status for the current connection
    ObjectUtils.assign(this, {isConnected: true});

    try {

      // build all metadatas registered in the current connection
      this.buildMetadatas();

      await this.driver.afterConnect();

      // if option is set - drop schema once connection is done
      if (this.options.dropSchema)
        await this.dropDatabase();

      // if option is set - automatically synchronize a schema
      if (this.options.synchronize)
        await this.synchronize();

      // if option is set - automatically synchronize a schema
      if (this.options.migrationsRun)
        await this.runMigrations({transaction: this.options.migrationsTransactionMode});

    } catch (error) {

      // if for some reason build metadata fail (for example validation error during entity metadata check)
      // connection needs to be closed
      await this.close();
      throw error;
    }

    return this;
  }

  /**
   * Closes connection with the database.
   * Once connection is closed, you cannot use repositories or perform any operations except opening connection again.
   */
  async close(): Promise<void> {
    if (!this.isConnected)
      throw new CannotExecuteNotConnectedError(this.name);

    await this.driver.disconnect();

    // disconnect from the cache-specific database if cache was enabled
    if (this.queryResultCache)
      await this.queryResultCache.disconnect();

    ObjectUtils.assign(this, {isConnected: false});
  }

  /**
   * Creates database schema for all entities registered in this connection.
   * Can be used only after connection to the database is established.
   *
   * @param dropBeforeSync If set to true then it drops the database with all its tables and data
   */
  async synchronize(dropBeforeSync: boolean = false): Promise<void> {

    if (!this.isConnected)
      throw new CannotExecuteNotConnectedError(this.name);

    if (dropBeforeSync)
      await this.dropDatabase();

    const schemaBuilder = this.driver.createSchemaBuilder();
    await schemaBuilder.build();
  }

  /**
   * Drops the database and all its data.
   * Be careful with this method on production since this method will erase all your database tables and their data.
   * Can be used only after connection to the database is established.
   */
  // TODO rename
  async dropDatabase(): Promise<void> {
    const queryRunner = this.createQueryRunner('master');
    try {
      await queryRunner.clearDatabase();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Runs all pending migrations.
   * Can be used only after connection to the database is established.
   */
  async runMigrations(options?: { transaction?: 'all' | 'none' | 'each' }): Promise<Migration[]> {
    if (!this.isConnected)
      throw new CannotExecuteNotConnectedError(this.name);

    const migrationExecutor = new MigrationExecutor(this);
    migrationExecutor.transaction = (options && options.transaction) || 'all';

    const successMigrations = await migrationExecutor.executePendingMigrations();
    return successMigrations;
  }

  /**
   * Reverts last executed migration.
   * Can be used only after connection to the database is established.
   */
  async undoLastMigration(options?: { transaction?: 'all' | 'none' | 'each' }): Promise<void> {

    if (!this.isConnected)
      throw new CannotExecuteNotConnectedError(this.name);

    const migrationExecutor = new MigrationExecutor(this);
    migrationExecutor.transaction = (options && options.transaction) || 'all';

    await migrationExecutor.undoLastMigration();
  }

  /**
   * Lists all migrations and whether they have been run.
   * Returns true if there are pending migrations
   */
  async showMigrations(): Promise<boolean> {
    if (!this.isConnected) {
      throw new CannotExecuteNotConnectedError(this.name);
    }
    const migrationExecutor = new MigrationExecutor(this);
    return await migrationExecutor.showMigrations();
  }

  /**
   * Checks if entity metadata exist for the given entity class, target name or table name.
   */
  hasMetadata(target: Function | EntitySchema<any> | string): boolean {
    return !!this.findMetadata(target);
  }

  /**
   * Gets entity metadata for the given entity class or schema name.
   */
  getMetadata(target: Function | EntitySchema<any> | string): EntityMetadata {
    const metadata = this.findMetadata(target);
    if (!metadata)
      throw new EntityMetadataNotFoundError(target);

    return metadata;
  }

  /**
   * Gets repository for the given entity.
   */
  getRepository<Entity>(target: QbjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity> {
    return this.manager.getRepository(target);
  }

  /**
   * Gets tree repository for the given entity class or name.
   * Only tree-type entities can have a TreeRepository, like ones decorated with @Tree decorator.
   */
  getTreeRepository<Entity>(target: QbjectType<Entity> | EntitySchema<Entity> | string): TreeRepository<Entity> {
    return this.manager.getTreeRepository(target);
  }

  /**
   * Gets custom entity repository marked with @EntityRepository decorator.
   */
  getCustomRepository<T>(customRepository: QbjectType<T>): T {
    return this.manager.getCustomRepository(customRepository);
  }

  /**
   * Wraps given function execution (and all operations made there) into a transaction.
   * All database operations must be executed using provided entity manager.
   */
  async transaction<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T>;
  async transaction<T>(isolationLevel: IsolationLevel, runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T>;
  async transaction<T>(
    isolationOrRunInTransaction: IsolationLevel | ((entityManager: EntityManager) => Promise<T>),
    runInTransactionParam?: (entityManager: EntityManager) => Promise<T>,
  ): Promise<any> {
    return this.manager.transaction(
      isolationOrRunInTransaction as any,
      runInTransactionParam as any,
    );
  }

  /**
   * Executes raw SQL query and returns raw database results.
   */
  async query(query: string, parameters?: any[], queryRunner?: QueryRunner): Promise<any> {
    if (queryRunner && queryRunner.isReleased) {
      throw new QueryRunnerProviderAlreadyReleasedError();
    }

    const usedQueryRunner = queryRunner || this.createQueryRunner('master');

    try {
      return await usedQueryRunner.query(query, parameters);  // await is needed here because we are using finally

    } finally {
      if (!queryRunner)
        await usedQueryRunner.release();
    }
  }

  /**
   * Creates a new query builder that can be used to build a sql query.
   */
  createQueryBuilder<Entity>(entityClass: QbjectType<Entity> | EntitySchema<Entity> | Function | string, alias: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity>;

  /**
   * Creates a new query builder that can be used to build a sql query.
   */
  createQueryBuilder(queryRunner?: QueryRunner): SelectQueryBuilder<any>;

  /**
   * Creates a new query builder that can be used to build a sql query.
   */
  createQueryBuilder<Entity>(entityOrRunner?: QbjectType<Entity> | EntitySchema<Entity> | Function | string | QueryRunner, alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
    if (alias) {
      const metadata = this.getMetadata(entityOrRunner as Function | EntitySchema<Entity> | string);
      return new SelectQueryBuilder(this, queryRunner)
        .select(alias)
        .from(metadata.target, alias);

    } else {
      return new SelectQueryBuilder(this, entityOrRunner as QueryRunner | undefined);
    }
  }

  /**
   * Creates a query runner used for perform queries on a single database connection.
   * Using query runners you can control your queries to execute using single database connection and
   * manually control your database transaction.
   *
   * Mode is used in replication mode and indicates whatever you want to connect
   * to master database or any of slave databases.
   * If you perform writes you must use master database,
   * if you perform reads you can use slave databases.
   */
  createQueryRunner(mode: 'master' | 'slave' = 'master'): QueryRunner {
    const queryRunner = this.driver.createQueryRunner(mode);
    const manager = this.createEntityManager(queryRunner);
    Object.assign(queryRunner, {manager: manager});
    return queryRunner;
  }

  /**
   * Gets entity metadata of the junction table (many-to-many table).
   */
  getManyToManyMetadata(entityTarget: Function | string, relationPropertyPath: string) {
    const relationMetadata = this.getMetadata(entityTarget).findRelationWithPropertyPath(relationPropertyPath);
    if (!relationMetadata)
      throw new Error(`Relation "${relationPropertyPath}" was not found in ${entityTarget} entity.`);
    if (!relationMetadata.isManyToMany)
      throw new Error(`Relation "${entityTarget}#${relationPropertyPath}" does not have a many-to-many relationship.` +
        `You can use this method only on many-to-many relations.`);

    return relationMetadata.junctionEntityMetadata;
  }

  /**
   * Creates an Entity Manager for the current connection with the help of the EntityManagerFactory.
   */
  createEntityManager(queryRunner?: QueryRunner): EntityManager {
    return new EntityManagerFactory().create(this, queryRunner);
  }

  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------

  /**
   * Finds exist entity metadata by the given entity class, target name or table name.
   */
  protected findMetadata(target: Function | EntitySchema<any> | string): EntityMetadata | undefined {
    return this.entityMetadatas.find(metadata => {
      if (metadata.target === target)
        return true;
      if (target instanceof EntitySchema) {
        return metadata.name === target.options.name;
      }
      if (typeof target === 'string') {
        if (target.indexOf('.') !== -1) {
          return metadata.tablePath === target;
        } else {
          return metadata.name === target || metadata.tableName === target;
        }
      }

      return false;
    });
  }

  /**
   * Builds metadatas for all registered classes inside this connection.
   */
  protected buildMetadatas(): void {

    const connectionMetadataBuilder = new ConnectionMetadataBuilder(this);
    const entityMetadataValidator = new EntityMetadataValidator();

    // create subscribers instances if they are not disallowed from high-level (for example they can disallowed from migrations run process)
    const subscribers = connectionMetadataBuilder.buildSubscribers(this.options.subscribers || []);
    ObjectUtils.assign(this, {subscribers: subscribers});

    // build entity metadatas
    const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas(this.options.entities || []);
    ObjectUtils.assign(this, {entityMetadatas: entityMetadatas});

    // create migration instances
    const migrations = connectionMetadataBuilder.buildMigrations(this.options.migrations || []);
    ObjectUtils.assign(this, {migrations: migrations});

    this.driver.database = this.getDatabaseName();

    // validate all created entity metadatas to make sure user created entities are valid and correct
    entityMetadataValidator.validateMany(this.entityMetadatas.filter(metadata => metadata.tableType !== 'view'), this.driver);
  }

  // This database name property is nested for replication configs.
  protected getDatabaseName(): string {
    const options = this.options;
    return DriverUtils.buildDriverOptions(options).database;
  }

}