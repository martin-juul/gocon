import { IsolationLevel } from '../../driver/types';

export interface TransactionOptions {
  connectionName?: string;
  isolation?: IsolationLevel;
}