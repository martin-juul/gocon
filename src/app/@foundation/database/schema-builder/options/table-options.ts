import { TableColumnOptions } from './table-column-options';
import { TableIndexOptions } from './table-index-options';
import { TableForeignKeyOptions } from './table-foreign-key-options';
import { TableUniqueOptions } from './table-unique-options';
import { TableCheckOptions } from './table-check-options';
import { TableExclusionOptions } from './table-exclusion-options';

/**
 * Table options.
 */
export interface TableOptions {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  /**
   * Table name.
   */
  name: string;

  /**
   * Table columns.
   */
  columns?: TableColumnOptions[];

  /**
   * Table indices.
   */
  indices?: TableIndexOptions[];

  /**
   * Table foreign keys.
   */
  foreignKeys?: TableForeignKeyOptions[];

  /**
   * Table unique constraints.
   */
  uniques?: TableUniqueOptions[];

  /**
   * Table check constraints.
   */
  checks?: TableCheckOptions[];

  /**
   * Table check constraints.
   */
  exclusions?: TableExclusionOptions[];

  /**
   * Indicates if table was just created.
   * This is needed, for example to check if we need to skip primary keys creation
   * for new tables.
   */
  justCreated?: boolean;

  /**
   * Table engine.
   */
  engine?: string;

}
