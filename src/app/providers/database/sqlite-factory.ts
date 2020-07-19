import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import * as CapacitorSQLPlugin from 'capacitor-sqlite';
import { CapacitorSQLitePlugin } from 'capacitor-sqlite';
import { createConnection } from '../../@foundation/database';

const {CapacitorSQLite} = Plugins;

export class SqliteFactory {
  public static make(platform: Platform): CapacitorSQLitePlugin {
    if (platform.is('ios') || platform.is('android')) {
      // @ts-ignore
      return CapacitorSQLite;
    }

    if (platform.is('electron')) {
      return CapacitorSQLPlugin.CapacitorSQLiteElectron;
    }

    return CapacitorSQLPlugin.CapacitorSQLite;
  }

  public static createTypeOrmConnection(platform: Platform) {
    const driver = SqliteFactory.make(platform);

    return createConnection({
      type: 'capacitor-sqlite',
      database: 'gocon',
      driver,
    });
  }
}
