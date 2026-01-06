declare global {
    interface Window {
        bridgeCommand<T>(command: string, callback?: (value: T) => void): void;
    }
}
export declare function bridgeCommand<T>(command: string, callback?: (value: T) => void): void;
