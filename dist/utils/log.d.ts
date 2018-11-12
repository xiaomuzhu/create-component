export interface ILogType {
    color: string;
    desc: string;
    level: number;
}
export declare const LogLevel: {
    ALL: number;
    TRACE: number;
    DEBUG: number;
    INFO: number;
    TIP: number;
    WARN: number;
    ERROR: number;
    FATAL: number;
    OFF: number;
};
export declare const LogType: {
    FATAL: {
        color: string;
        desc: string;
        level: number;
    };
    ERROR: {
        color: string;
        desc: string;
        level: number;
    };
    WARN: {
        color: string;
        desc: string;
        level: number;
    };
    CHANGE: {
        color: string;
        desc: string;
        level: number;
    };
    DELETE: {
        color: string;
        desc: string;
        level: number;
    };
    TIP: {
        color: string;
        desc: string;
        level: number;
    };
    CREATE: {
        color: string;
        desc: string;
        level: number;
    };
    WATCH: {
        color: string;
        desc: string;
        level: number;
    };
    BUILD: {
        color: string;
        desc: string;
        level: number;
    };
    INFO: {
        color: string;
        desc: string;
        level: number;
    };
    RUN: {
        color: string;
        desc: string;
        level: number;
    };
    COMPRESS: {
        color: string;
        desc: string;
        level: number;
    };
    COMPLETE: {
        color: string;
        desc: string;
        level: number;
    };
    WRITE: {
        color: string;
        desc: string;
        level: number;
    };
    GENERATE: {
        color: string;
        desc: string;
        level: number;
    };
    COPY: {
        color: string;
        desc: string;
        level: number;
    };
    DEBUG: {
        color: string;
        desc: string;
        level: number;
    };
    TRACE: {
        color: string;
        desc: string;
        level: number;
    };
};
export declare const log: {
    type: {
        FATAL: {
            color: string;
            desc: string;
            level: number;
        };
        ERROR: {
            color: string;
            desc: string;
            level: number;
        };
        WARN: {
            color: string;
            desc: string;
            level: number;
        };
        CHANGE: {
            color: string;
            desc: string;
            level: number;
        };
        DELETE: {
            color: string;
            desc: string;
            level: number;
        };
        TIP: {
            color: string;
            desc: string;
            level: number;
        };
        CREATE: {
            color: string;
            desc: string;
            level: number;
        };
        WATCH: {
            color: string;
            desc: string;
            level: number;
        };
        BUILD: {
            color: string;
            desc: string;
            level: number;
        };
        INFO: {
            color: string;
            desc: string;
            level: number;
        };
        RUN: {
            color: string;
            desc: string;
            level: number;
        };
        COMPRESS: {
            color: string;
            desc: string;
            level: number;
        };
        COMPLETE: {
            color: string;
            desc: string;
            level: number;
        };
        WRITE: {
            color: string;
            desc: string;
            level: number;
        };
        GENERATE: {
            color: string;
            desc: string;
            level: number;
        };
        COPY: {
            color: string;
            desc: string;
            level: number;
        };
        DEBUG: {
            color: string;
            desc: string;
            level: number;
        };
        TRACE: {
            color: string;
            desc: string;
            level: number;
        };
    };
    fatal: (msg: string | Error) => void;
    error: (msg: string | Error) => void;
    warn: (msg: string) => void;
    tip: (msg: string) => void;
    info: (msg: string) => void;
    debug: (msg: string) => void;
    msg: (logType: ILogType, msg: string | Object | any[] | Error) => void;
    output: (logType: ILogType, msg: string, file: string) => void;
    newline: () => void;
    register: (cb: Function) => void;
    unRegister: () => void;
};
