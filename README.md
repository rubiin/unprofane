# Unprofane
A typescript profanity detector and filter for Node.js and the browser.


# Installation
```js
$ npm i unprofane
```

In Node.js:
```js
const Unprofane = require('unprofane');
//or
import Unprofane from 'unprofane'
```

# Example Usage

```js
const isProfane = new Unprofane({lang : 'all'});
//Multilingual support for word filtering
//{lang : 'all'} represents all language word filter
//Available language are ['ar','cs','da','en','eo','es','fa','fi','fr','hi','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','zh']

//profanity check returns boolen
console.log(isProfane.check("Don't be an ash0le")); //true

//profanity clean returns cleaned word
console.log(isProfane.censor("Don't be an ash0le")); //Don't be an ******

```
Note: Default value for Unprofane { lang : 'all', placeHolder: '*' }.

**Placeholder Overrides**
```js
const isProfane = new Unprofane({ placeHolder: 'x'});
isProfane.censor("Don't be an ash0le"); //Don't be an xxxxxx
```

**Regex Overrides**
```js
const isProfane = new Unprofane({ regex: /\*|\.|$/gi });
const isProfane = new Unprofane({ replaceRegex:  /[A-Za-z0-9가-힣_]/g });
```

**Add words to the blacklist**
```js
const isProfane = new Unprofane();
isProfane.addWords(['some', 'bad', 'word']);
isProfane.censor("some bad word!") //**** *** ****!
isProfane.check("some bad word!") //true

//or

const isProfane = new Unprofane({ list: ['some', 'bad', 'word'] });
isProfane.censor("some bad word!") //**** *** ****!
isProfane.check("some bad word!") //true
```

**Instantiate with an empty list**
```js
const isProfane = new Unprofane({ emptyList: true });
isProfane.censor('hell this wont clean anything'); //hell this wont clean anything
isProfane.censor('hell this wont clean anything'); //false
```

**Remove words from the blacklist**
```js
const isProfane = new Unprofane();
isProfane.removeWords(['hells', 'sadist']);
isProfane.censor("some hells word!"); //some hells word!
isProfane.check("some hells word!"); //false
```

**Exclude words from the profanity list**
```js
const isProfane = new Unprofane({ exclude: ['ash0le'] });
isProfane.check("Don't be an ash0le"); //false
isProfane.censor("Don't be an ash0le"); //Don't be an ash0le
```

**Export words list with language**
```js
const isProfane = new Unprofane();
isProfane.wordsList('all'); // [ "Asesinato", "*shit*"...]
isProfane.wordsList('es'); // [ "Asesinato", "Bollera",..]
isProfane.wordsList('en'); // [ "*dyke", "*shit*"...]
// on error lang is 'all'
```

