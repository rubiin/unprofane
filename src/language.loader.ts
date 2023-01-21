import fs from 'fs'
import path from 'path'

const words: Record<string, string[]> = {
  all: [],
}

/* Reading the files in the data directory and then adding them to the words object. */
fs.readdirSync(path.join(__dirname,'/data')).forEach((file: string) => {
  const list = require(path.join(__dirname, 'data', file))
  words[file.slice(0, -5)] = list
  words.all = Array.prototype.concat.apply(words.all, list)
})

export default words
