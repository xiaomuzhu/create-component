/// <reference types="node" />
import { SpawnOptions } from 'child_process';
export interface IExecResult {
    stderr: string;
    stdout: string;
}
export declare function exec(command: string, args: string[], verbose: boolean | undefined, options: SpawnOptions): Promise<IExecResult>;
