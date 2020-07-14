export interface MigrationDirections {
  up(): string;
  down(): string;
}

export abstract class Migration implements MigrationDirections {
  abstract name();

  // language=SQLite
  abstract up(): string;

  // language=SQLite
  abstract down(): string;
}

export class InitialMigration implements MigrationDirections {
  // language=SQLite
  up(): string {
    return `
    begin transaction;

    create table if not exists migrations (
      id integer primary key not null,
      name text unique not null,
      timestamp datetime default current_timestamp
    );
    commit transaction;
    `;
  }

  down(): string {
    return '';
  }
}
