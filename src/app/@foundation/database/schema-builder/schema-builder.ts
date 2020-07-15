import { SqlInMemory } from '../driver/sql-in-memory';

/**
 * Creates complete tables schemas in the database based on the entity metadatas.
 */
export interface SchemaBuilder {

  /**
   * Creates complete schemas for the given entity metadatas.
   */
  build(): Promise<void>;

  /**
   * Returns queries to be executed by schema builder.
   */
  log(): Promise<SqlInMemory>;

}