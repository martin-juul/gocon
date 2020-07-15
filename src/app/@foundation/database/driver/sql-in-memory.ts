import { Query } from './query';

/**
 * This class stores up and down queries needed for migrations functionality.
 */
export class SqlInMemory {
  upQueries: Query[] = [];
  downQueries: Query[] = [];
}
