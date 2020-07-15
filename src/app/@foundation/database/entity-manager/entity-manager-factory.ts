import { Connection } from '../connection';
import { EntityManager } from './entity-manager';
import { SqljsEntityManager } from './sqljs-entity-manager';
import { SqljsDriver } from '../driver/sqljs';
import { QueryRunner } from '../query-runner';

/**
 * Helps to create entity managers.
 */
export class EntityManagerFactory {

  /**
   * Creates a new entity manager depend on a given connection's driver.
   */
  create(connection: Connection, queryRunner?: QueryRunner): EntityManager {
    if (connection.driver instanceof SqljsDriver) {
      return new SqljsEntityManager(connection, queryRunner);
    }

    return new EntityManager(connection, queryRunner);
  }

}