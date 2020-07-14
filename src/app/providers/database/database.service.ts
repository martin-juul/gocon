import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteFactory } from './sqlite-factory';
import { CapacitorSQLitePlugin } from 'capacitor-sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private driver: CapacitorSQLitePlugin;

  constructor(private platform: Platform) {
  }

  async openConnection() {
    if (!this.driver) {
      this.driver = SqliteFactory.make(this.platform);
    }

    try {
      const r = await this.driver.open({
        database: 'gocon',
      });

      console.debug('[DatabaseService]: Loaded with success', JSON.stringify(r));
    } catch (e) {
      console.error('[DatabaseService]: Failed loading', JSON.stringify(e));
    }

    return Promise.resolve();
  }

  async ping(): Promise<boolean> {
    const res = await this.driver.echo({value: 'ping'});

    return res.value === 'ping';
  }
}
