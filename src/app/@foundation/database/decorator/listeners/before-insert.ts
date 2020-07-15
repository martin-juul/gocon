import { getMetadataArgsStorage } from '../../';
import { EventListenerTypes } from '../../metadata/types';
import { EntityListenerMetadataArgs } from '../../metadata-args';

/**
 * Calls a method on which this decorator is applied before this entity insertion.
 */
export function BeforeInsert() {
  return function (object: Object, propertyName: string) {

    getMetadataArgsStorage().entityListeners.push({
      target: object.constructor,
      propertyName: propertyName,
      type: EventListenerTypes.BEFORE_INSERT,
    } as EntityListenerMetadataArgs);
  };
}