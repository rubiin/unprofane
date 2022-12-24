import { readdirSync } from 'fs';
import { basename, join } from 'path';

const words: Record<string,string[]> = {
  all: []
};

readdirSync(__dirname+'/data')
  .forEach((file: string) => {
    const list = require(join(__dirname,'static','languages', file));
    words[file.slice(0, -5)] = list;
    words.all = Array.prototype.concat.apply(words.all, list);
  });

export default words;
