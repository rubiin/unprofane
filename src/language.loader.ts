import { readdirSync } from 'fs';
import { fileURLToPath } from 'node:url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const words: Record<string,string[]> = {
  all: []
};



/* Reading the files in the data directory and then adding them to the words object. */
readdirSync(__dirname+'/data')
  .forEach((file: string) => {
    const list = require(path.join(__dirname,'data', file));
    words[file.slice(0, -5)] = list;
    words.all = Array.prototype.concat.apply(words.all, list);
  });

export default words;
