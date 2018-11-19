import { FrameworkType, Language, OpenSourceLicenseType } from '../../utils/tools';
export interface IOptions {
    proName: string;
    proPath: string;
    dest: string;
    projectType: string;
    frameworkType: FrameworkType;
    projectLanguage: Language;
    title: string;
    license: OpenSourceLicenseType;
    useCommitlint: boolean;
    usePrecommit: boolean;
}
export declare class InitCommand {
    options: IOptions;
    constructor(options: IOptions);
    run(): Promise<void>;
    private copyScaffold;
    private npmInstall;
    private gitInit;
}
