export interface InitCMDOptions {
    defaults: boolean;
    noInstall: boolean;
    full: boolean;
}
declare const _default: {
    name: string;
    alias: string;
    usage: string;
    description: string;
    options: string[][];
    action: (proName: string, cmd: InitCMDOptions) => Promise<void>;
};
export default _default;
