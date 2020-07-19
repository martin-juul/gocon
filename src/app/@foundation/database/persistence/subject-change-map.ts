import { ColumnMetadata, RelationMetadata } from '../metadata';
import { Subject } from './subject';

/**
 * Change for insertion or updation of the column of the subject.
 */
export interface SubjectChangeMap {

  /**
   * Column that needs to be changed.
   * Either column, either relation must be set in the change.
   */
  column?: ColumnMetadata;

  /**
   * Relation that needs to be changed.
   * Either column, either relation must be set in the change.
   */
  relation?: RelationMetadata;

  /**
   * Value needs to be inserted into given column.
   * This value can also be another subject, when this column has a referenced column.
   */
  value: Subject | any;

}
