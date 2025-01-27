interface TypeWriterPlusOptions {
    speed?: number;
    deleteSpeed?: number;
    pauseBetweenSentences?: number;
    loop?: boolean;
    cursor?: boolean;
    cursorColor?: string;
    textColor?: string;
    cursorSize?: string;
    textSize?: string;
}

declare class TypeWriterPlus {
    constructor(selector: string, options?: TypeWriterPlusOptions);

    create(): TypeWriterPlus;
    static init(selector: string, options?: TypeWriterPlusOptions): TypeWriterPlus;
    static version: string;
}

export = TypeWriterPlus;