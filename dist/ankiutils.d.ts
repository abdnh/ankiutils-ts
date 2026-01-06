export declare function bridgeCommand<T>(command: string, callback?: (value: T) => void): void;

export declare function checkNightMode(): boolean;

export declare const pageTheme: ThemeInfo;

export declare function promiseWithResolver<T>(): [Promise<T>, (value: T) => void];

export declare interface ThemeInfo {
    isDark: boolean;
}

export { }
