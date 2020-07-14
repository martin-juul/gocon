import { CapacitorSQLitePlugin } from 'capacitor-sqlite';
import { MigrationDirections } from './migrations';

export class Migrator {
  private migrations: MigrationDirections[] = [

  ];

  constructor(private connection: CapacitorSQLitePlugin) {
  }

  migrate() {

  }

  hasMigrationTable(){

  }

}
