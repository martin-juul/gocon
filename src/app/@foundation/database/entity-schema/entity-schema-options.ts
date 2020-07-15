import { Connection, SelectQueryBuilder } from '..';
import { EntitySchemaIndexOptions } from './entity-schema-index-options';
import { EntitySchemaColumnOptions } from './entity-schema-column-options';
import { EntitySchemaRelationOptions } from './entity-schema-relation-options';
import { OrderByCondition } from '../find-options';
import { TableType } from '../metadata/types';
import { EntitySchemaUniqueOptions } from './entity-schema-unique-options';
import { EntitySchemaCheckOptions } from './entity-schema-check-options';
import { EntitySchemaExclusionOptions } from './entity-schema-exclusion-options';

/**
 * Interface for entity metadata mappings stored inside "schemas" instead of models decorated by decorators.
 */
export class EntitySchemaOptions<T> {

  /**
   * Name of the schema it extends.
   */
  extends?: string;

  /**
   * Target bind to this entity schema. Optional.
   */
  target?: Function;

  /**
   * Entity name.
   */
  name: string;

  /**
   * Table name.
   */
  tableName?: string;

  /**
   * Database name. Used in MySql and Sql Server.
   */
  database?: string;

  /**
   * Schema name. Used in Postgres and Sql Server.
   */
  schema?: string;

  /**
   * Table type.
   */
  type?: TableType;

  /**
   * Specifies a property name by which queries will perform ordering by default when fetching rows.
   */
  orderBy?: OrderByCondition;

  /**
   * Entity column's options.
   */
  columns: {
    [P in keyof T]?: EntitySchemaColumnOptions;
  };

  /**
   * Entity relation's options.
   */
  relations?: {
    [P in keyof T]?: EntitySchemaRelationOptions;
  };

  /**
   * Entity indices options.
   */
  indices?: EntitySchemaIndexOptions[];

  /**
   * Entity uniques options.
   */
  uniques?: EntitySchemaUniqueOptions[];

  /**
   * Entity check options.
   */
  checks?: EntitySchemaCheckOptions[];

  /**
   * Entity exclusion options.
   */
  exclusions?: EntitySchemaExclusionOptions[];

  /**
   * Indicates if schema synchronization is enabled or disabled for this entity.
   * If it will be set to false then schema sync will and migrations ignore this entity.
   * By default schema synchronization is enabled for all entities.
   */
  synchronize?: boolean;

  /**
   * View expression.
   */
  expression?: string | ((connection: Connection) => SelectQueryBuilder<any>);

}
