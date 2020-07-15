import { getMetadataArgsStorage } from '../../';
import { DiscriminatorValueMetadataArgs, TableMetadataArgs } from '../../metadata-args';

/**
 * Special type of the table used in the single-table inherited tables.
 */
export function ChildEntity(discriminatorValue?: any) {
  return function (target: Function) {

    // register a table metadata
    getMetadataArgsStorage().tables.push({
      target: target,
      type: 'entity-child',
    } as TableMetadataArgs);

    // register discriminator value if it was provided
    if (discriminatorValue) {
      getMetadataArgsStorage().discriminatorValues.push({
        target: target,
        value: discriminatorValue,
      } as DiscriminatorValueMetadataArgs);
    }
  };
}
