import {BaseConnectionOptions} from "../../connection/base-connection-options";

/**
 * Sqlite-specific connection options.
 */
export interface ExpoConnectionOptions extends BaseConnectionOptions {

    /**
     * Database type.
     */
    readonly type: "expo";

    /**
     * Database name.
     */
    readonly database: string;

    /**
    * Driver module
    */
    readonly driver: any;
}
