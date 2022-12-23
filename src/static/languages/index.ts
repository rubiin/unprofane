import { readdirSync } from 'fs';
import { basename, join } from 'path';

const baseName = basename(module.filename);
const words: any = {};
words.all = [];

readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf('.') !== 0 && file !== baseName && file.slice(-5) === '.json';
  })
  .forEach((file: string) => {
    const list = require(join(__dirname, file));
    words[file.slice(0, -5)] = list;
    words.all = Array.prototype.concat.apply(words.all, list);
  });

export default words;
