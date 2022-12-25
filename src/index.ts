import * as wordList from './language.loader';

/* An interface that is used to define the type of the options that are passed to the constructor. */
interface UnprofaneOptions {
  lang?: string;
  placeHolder?: string;
  exclude?: string[];
  list?: string[];
  emptyList?: boolean;
  regex?: RegExp;
  replaceRegex?: RegExp;
}

export default class Unprofane {
  private lang!: string;
  private list!: string[];
  private placeHolder!: string;
  private regex!: RegExp;
  private replaceRegex!: RegExp;
  private exclude!: string[];

  constructor(option?: UnprofaneOptions) {
    option = {
      lang: 'all',
      placeHolder: '*',
      regex: /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: /\w/g,
      exclude: [],
      ...option,
    };
    Object.assign(this, option);
    this.list =
      option && option.emptyList
        ? []
        : Array.prototype.concat.apply(wordList.default[this.lang], option && option.list ? option.list : []);
  }

  /**
   * We split the word into an array of words, then we map over the array and check if the word is in the
   * list of bad words. If it is, we replace it with a censored version of the word. If it's not, we
   * return the word
   * @param {string} wordToClean - string - this is the word that we want to clean.
   * @returns The word is being returned with the asterisks in place of the letters.
   */
  censor(wordToClean: string): string {
    return wordToClean
      .split(/\b/)
      .map((word) => {
        return this.check(word) ? this.replaceWord(word) : word;
      })
      .join('');
  }

  /**
   * It takes a word to check, and returns true if the word is in the list, and false if it's not
   * @param {string} wordToCheck - The word to check for profanity.
   * @returns A boolean value.
   */
  check(wordToCheck: string): boolean {
    return (
      this.list.filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return this.exclude.indexOf(word.toLowerCase()) >= 0 ? false : true && wordExp.test(wordToCheck);
      }).length > 0 || false
    );
  }

  /**
   * It returns a list of words in the language specified by the parameter, or the default language if no
   * parameter is specified
   * @param {string} [lang] - The language you want to get the word list for.
   * @returns the wordList.default[lang] if the lang is valid. If the lang is not valid, it returns the
   * list.
   */
  wordsList(lang?: string): string[] {
    return lang && this.isValidLang(lang) ? wordList.default[lang] : this.list;
  }

  /**
   * It adds words to the list of words to be included in the password, and removes them from the list of
   * words to be excluded
   * @param {string[]} words - string[]
   */
  addWords(words: string[]): void {
    this.list.push(...words);
    words
      .map((word) => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.indexOf(word) >= 0) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  /* Taking an array of words and pushing them to the exclude array. */
  removeWords(words: string[]): void {
    words.map((word) => {
      word.toLowerCase();
      this.exclude.push(word);
    });
  }

  /**
   * It takes a string as an argument, and returns true if the string is a valid language, and false if
   * it is not
   * @param {string} lang - The language you want to use.
   * @returns The index of the first element in the array that satisfies the provided testing function.
   * Otherwise -1 is returned.
   */
  private isValidLang(lang: string): boolean {
    return Object.keys(wordList.default)
      .map((key) => {
        return key === lang;
      })
      .indexOf(true) >= 0
      ? true
      : false;
  }

  /**
   * It takes a word, removes all the characters that are not letters, and replaces all the letters with
   * a placeholder
   * @param {string} wordToReplace - The word that we want to replace.
   * @returns The wordToReplace is being returned with the regex and replaceRegex replaced with the
   * placeHolder.
   */
  private replaceWord(wordToReplace: string): string {
    return wordToReplace.replace(this.regex, '').replace(this.replaceRegex, this.placeHolder);
  }
}
