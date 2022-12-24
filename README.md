# Unprofane
A typescript profanity detector and filter for Node.js and the browser.


# Installation

Using npm:
```js
$ npm i unprofane
$ npm i --save unprofane
```

In Node.js:
```js
var Unprofane = require('unprofane');
//or
import Unprofane from 'unprofane'
```

# Example Usage

```js
var isProfane = new Unprofane({lang : 'all'});
//Multilingual support for word filtering
//{lang : 'all'} represents all language word filter
//Available language are ['ar','cs','da','en','eo','es','fa','fi','fr','hi','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','zh']

//profanity check returns boolen
console.log(isProfane.check("Don't be an ash0le")); //true

//profanity clean returns cleaned word
console.log(isProfane.clean("Don't be an ash0le")); //Don't be an ******

```
Note: Default value for Unprofane { lang : 'all', placeHolder: '*' }.

**Placeholder Overrides**
```js
var isProfane = new Unprofane({ placeHolder: 'x'});
isProfane.clean("Don't be an ash0le"); //Don't be an xxxxxx
```

**Regex Overrides**
```js
var isProfane = new Unprofane({ regex: /\*|\.|$/gi });
var isProfane = new Unprofane({ replaceRegex:  /[A-Za-z0-9가-힣_]/g });
```

**Add words to the blacklist**
```js
var isProfane = new Unprofane();
isProfane.addWords(['some', 'bad', 'word']);
isProfane.clean("some bad word!") //**** *** ****!
isProfane.check("some bad word!") //true

//or

var isProfane = new Unprofane({ list: ['some', 'bad', 'word'] });
isProfane.clean("some bad word!") //**** *** ****!
isProfane.check("some bad word!") //true
```

**Instantiate with an empty list**
```js
var isProfane = new Unprofane({ emptyList: true });
isProfane.clean('hell this wont clean anything'); //hell this wont clean anything
isProfane.clean('hell this wont clean anything'); //false
```

**Remove words from the blacklist**
```js
var isProfane = new Unprofane();
isProfane.removeWords(['hells', 'sadist']);
isProfane.clean("some hells word!"); //some hells word!
isProfane.check("some hells word!"); //false
```

**Exclude words from the profanity list**
```js
var isProfane = new Unprofane({ exclude: ['ash0le'] });
isProfane.clean("Don't be an ash0le"); //Don't be an ash0le
isProfane.check("Don't be an ash0le"); //false
```

**Export words list with language**
```js
var isProfane = new Unprofane();
isProfane.wordsList('all'); // [ "Asesinato", "*shit*"...]
isProfane.wordsList('en'); // [ "*dyke", "*shit*"...]
isProfane.wordsList('es'); // [ "Asesinato", "Bollera",..]
// on error lang is 'all'
```

