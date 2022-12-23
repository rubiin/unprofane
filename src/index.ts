import * as wordList from './language.loader';

interface UnprofaneOptions {
  lang?: string;
  placeHolder?: string;
  exclude?: string[];
  list?: string[];
  emptyList?: boolean;
  regex?: RegExp;
  replaceRegex?: RegExp;
}

export  default class Unprofane implements UnprofaneOptions {
  public lang: string;
  public list: string[];
  public placeHolder: string;
  public regex: RegExp;
  public replaceRegex: RegExp;
  public exclude: string[];

  constructor(option?: UnprofaneOptions) {
    this.lang = option && option.lang && this.isValidLang(option.lang) ? option.lang : 'all';
    this.list =
      option && option.emptyList
        ? []
        : Array.prototype.concat.apply(wordList.default[this.lang], option && option.list ? option.list : []);
    this.placeHolder = (option && option.placeHolder) || '*';
    this.regex = (option && option.regex) || /[^a-zA-Z0-9|\$|\@]|\^/g;
    this.replaceRegex = (option && option.replaceRegex) || /\w/g;
    this.exclude = (option && option.exclude) || [];
  }

  public clean(wordToClean: string) {
    return wordToClean
      .split(/\b/)
      .map(word => {
        return this.check(word) ? this.replaceWord(word) : word;
      })
      .join('');
  }

  public check(wordToCheck: string) {
    return (
      this.list.filter(word => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return this.exclude.indexOf(word.toLowerCase()) >= 0 ? false : true && wordExp.test(wordToCheck);
      }).length > 0 || false
    );
  }

  public wordsList(lang?: string) {
    return lang && this.isValidLang(lang) ? wordList.default[lang] : this.list;
  }

  public addWords(words: string[]): void {
    this.list.push(...words);
    words
      .map(word => word.toLowerCase())
      .forEach(word => {
        if (this.exclude.indexOf(word) >= 0) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  public removeWords(words: string[]): void {
    words.map(word => {
      word.toLowerCase();
      this.exclude.push(word);
    });
  }

  private isValidLang(lang: string) {
    return Object.keys(wordList.default)
      .map((key) => {
        return key === lang;
      })
      .indexOf(true) >= 0
      ? true
      : false;
  }

  private replaceWord(wordToReplace: string) {
    return wordToReplace.replace(this.regex, '').replace(this.replaceRegex, this.placeHolder);
  }
}
