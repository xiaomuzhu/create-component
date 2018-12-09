declare const _default: {
    name: string;
    alias: string;
    usage: string;
    description: string;
    options: string[][];
    action: (proName: string, cmd: import("./cli/Init").InitCMDOptions) => Promise<void>;
}[];
export default _default;
