export declare enum Language {
    TypeScript = "TypeScript",
    JavaScript = "JavaScript"
}
export declare enum FrameworkType {
    React = "React",
    Vue = "Vue",
    Angular = "Angular"
}
export declare enum OpenSourceLicenseType {
    BSD = "BSD",
    MIT = "MIT",
    Apache = "Apache"
}
export declare enum Manger {
    NPM = "npm",
    YARN = "yarn"
}
export interface IScaffoldType {
    FrameworkType: FrameworkType;
    Language: Language;
}
export declare function getScaffoldPath(scaffoldType: IScaffoldType, filePath?: string): string;
export declare function getDestProjectPath(projectName: string, filePath?: string): string;
