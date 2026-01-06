import { Client } from '@connectrpc/connect';
import { DescService } from '@bufbuild/protobuf';
import { SvelteComponent as Spinner } from 'svelte';

export declare function bridgeCommand<T>(command: string, callback?: (value: T) => void): void;

export declare function checkNightMode(): boolean;

export declare function createProtoClient<T extends DescService>(service: T): Client<T>;

export declare const pageTheme: ThemeInfo;

export declare function promiseWithResolver<T>(): [Promise<T>, (value: T) => void];

export { Spinner }

export declare interface ThemeInfo {
    isDark: boolean;
}

export { }
