import { getMetadataArgsStorage } from '../../';
import { EventListenerTypes } from '../../metadata/types';
import { EntityListenerMetadataArgs } from '../../metadata-args';

/**
 * Calls a method on which this decorator is applied after this entity update.
 */
export function AfterUpdate() {
  return function (object: Object, propertyName: string) {

    getMetadataArgsStorage().entityListeners.push({
      target: object.constructor,
      propertyName: propertyName,
      type: EventListenerTypes.AFTER_UPDATE,
    } as EntityListenerMetadataArgs);
  };
}