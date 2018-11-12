export declare enum Language {
    TypeScript = "TypeScript",
    JavaScript = "JavaScript"
}
export declare enum FrameworkType {
    React = "React",
    Vue = "Vue",
    Angular = "Angular"
}
declare enum OpenSourceLicenseType {
    BSD = "BSD",
    MIT = "MIT",
    Apache = "Apache"
}
export interface IScaffoldType {
    FrameworkType: FrameworkType;
    Language: Language;
    OpenSourceLicenseType: OpenSourceLicenseType;
}
export declare function getScaffoldPath(scaffoldType: IScaffoldType, filePath?: string): string;
export declare function getDestProjectPath(projectName: string, filePath?: string): string;
export {};
