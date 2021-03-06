import { QueryRunner } from '../query-runner/query-runner';

/**
 * Migrations should implement this interface and all its methods.
 */
export interface MigrationInterface {
  /**
   * Optional migration name, defaults to class name.
   */
  name?: string;

  /**
   * Run the migrations.
   */
  up(queryRunner: QueryRunner): Promise<any>;

  /**
   * Reverse the migrations.
   */
  down(queryRunner: QueryRunner): Promise<any>;

}
