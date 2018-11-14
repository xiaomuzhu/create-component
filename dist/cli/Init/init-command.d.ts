import { FrameworkType, Language } from '../../utils/tools';
export interface IOptions {
    proName: string;
    proPath: string;
    dest: string;
    projectType: string;
    frameworkType: FrameworkType;
    projectLanguage: Language;
    title: string;
}
export declare class InitCommand {
    options: IOptions;
    constructor(options: IOptions);
    run(): Promise<void>;
    private copyScaffold;
    private npmInstall;
}
