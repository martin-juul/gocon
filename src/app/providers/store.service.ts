import { Injectable } from '@angular/core';

import { CapacitorDataStorageSqlitePlugin } from 'capacitor-data-storage-sqlite';
import { Platform } from '@ionic/angular';
import { DbFactory } from './db-factory';
import { Logger, LoggingService } from 'ionic-logging-service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  store: CapacitorDataStorageSqlitePlugin;

  private logger: Logger;

  constructor(private platform: Platform,
              private loggingService: LoggingService) {
    this.logger = loggingService.getLogger('StoreService');
  }

  async init(): Promise<void> {
    this.store = DbFactory.make(this.platform);
  }

  /**
   * Open a Database
   * @param _dbName string optional
   * @param _table string optional
   * @param _encrypted boolean optional
   * @param _mode string optional
   */
  async openStore(_dbName?: string, _table?: string, _encrypted?: boolean, _mode?: 'secret' | 'encryption' | 'newsecret'): Promise<boolean> {
    const database = _dbName ? _dbName : 'storage';
    const table = _table ? _table : 'storage_table';
    const encrypted = _encrypted ? _encrypted : false;
    const mode: string = _mode ? _mode : 'no-encryption';
    const r = await this.store.openStore({database, table, encrypted, mode});

    this.logger.debug('openStore', {_dbName, _table, _encrypted, _mode}, r)

    return r.result;
  }

  /**
   * Create/Set a Table
   * @param table string
   */
  async setTable(table: string): Promise<void> {
    const {result, message} = await this.store.setTable({table});

    this.checkResult(result, message);
  }

  /**
   * Set of Key
   * @param key string
   * @param value string
   */
  async setItem(key: string, value: string | object) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    const {result, message} = await this.store.set({key, value});
    this.checkResult(result, message);
  }

  /**
   * Get the Value for a given Key
   * @param key string
   */
  async getItem(key: string): Promise<string | null> {
    const {value, result} = await this.store.get({key});
    if (!result) {
      return null;
    }

    return value;
  }

  async isKey(key: string): Promise<boolean> {
    if (key.length > 0) {
      const {result} = await this.store.iskey({key});
      return result;
    }

    return false;
  }

  async getAllKeys(): Promise<Array<string>> {
    const {keys} = await this.store.keys();
    return keys;
  }

  async getAllValues(): Promise<Array<string>> {
    const {values} = await this.store.values();
    return values;
  }

  async getAllKeysValues(): Promise<Array<any>> {
    const {keysvalues} = await this.store.keysvalues();
    return keysvalues;
  }

  async removeItem(key: string): Promise<boolean> {
    const {result} = await this.store.remove({key});
    return result;
  }

  async clear(): Promise<boolean> {
    const {result} = await this.store.clear();
    return result;
  }

  async deleteStore(_dbName?: string): Promise<boolean> {
    const database: string = _dbName ? _dbName : 'storage';
    await this.init();
    const {result} = await this.store.deleteStore({database});
    return result;
  }

  private checkResult = (result: undefined | boolean, message?: string) => {
    if (!result) {
      if (!message) {
        message = 'The operation failed due to an unknown error.';
      }

      throw new Error(message);
    }
  };
}
