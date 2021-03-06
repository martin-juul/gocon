import { getMetadataArgsStorage } from '../../';
import { EventListenerTypes } from '../../metadata/types';
import { EntityListenerMetadataArgs } from '../../metadata-args';

/**
 * Calls a method on which this decorator is applied after entity is loaded.
 */
export function AfterLoad() {
  return function (object: Object, propertyName: string) {

    getMetadataArgsStorage().entityListeners.push({
      target: object.constructor,
      propertyName: propertyName,
      type: EventListenerTypes.AFTER_LOAD,
    } as EntityListenerMetadataArgs);
  };
}