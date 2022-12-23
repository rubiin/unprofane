interface UnprofaneOptions {
    lang?: string;
    placeHolder?: string;
    exclude?: string[];
    list?: string[];
    emptyList?: boolean;
    regex?: RegExp;
    replaceRegex?: RegExp;
}
declare class Unprofane implements UnprofaneOptions {
    lang: string;
    list: string[];
    placeHolder: string;
    regex: RegExp;
    replaceRegex: RegExp;
    exclude: string[];
    constructor(option?: UnprofaneOptions);
    clean(wordToClean: string): string;
    check(wordToCheck: string): boolean;
    wordsList(lang?: string): any;
    addWords(words: string[]): void;
    removeWords(words: string[]): void;
    private isValidLang;
    private replaceWord;
}

export { Unprofane as default };
