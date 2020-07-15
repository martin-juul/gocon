import { RelationCountAttribute } from './relation-count-attribute';

export interface RelationCountLoadResult {
  relationCountAttribute: RelationCountAttribute;
  results: { cnt: any, parentId: any }[];
}