import * as CDSSPlugin from 'capacitor-data-storage-sqlite';
import { CapacitorDataStorageSqlite, CapacitorDataStorageSqlitePlugin } from 'capacitor-data-storage-sqlite';
import { Platform } from '@ionic/angular';

export class DbFactory {
  public static make(platform: Platform): CapacitorDataStorageSqlitePlugin {
    if (platform.is('ios') || platform.is('android')) {
      // @ts-ignore
      return CapacitorDataStorageSqlite;
    } else if (platform.is('electron')) {
      return CDSSPlugin.CapacitorDataStorageSqliteElectron;
    }

    return CDSSPlugin.CapacitorDataStorageSqlite;
  }

}
