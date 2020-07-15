import { ColumnType, DatabaseType } from '../driver/types';
import { ColumnMetadata } from '../metadata';

export class DataTypeNotSupportedError extends Error {
  name = 'DataTypeNotSupportedError';

  constructor(column: ColumnMetadata, dataType: ColumnType, database?: DatabaseType) {
    super();
    Object.setPrototypeOf(this, DataTypeNotSupportedError.prototype);
    const type = typeof dataType === 'string' ? dataType : (<any>dataType).name;
    this.message = `Data type "${type}" in "${column.entityMetadata.targetName}.${column.propertyName}" is not supported by "${database}" database.`;
  }

}