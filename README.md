# Profanease
A lightweight javascript detector and filter for profanity words / bad words written in typescript


* Works on ECMAScript all versions
* Support for multi language profanity detector and filter

# Installation 

Using npm:   
```js   
$ npm i profanease
$ npm i --save profanease
```

In Node.js: 
```js   
var Profanease = require('profanease');
//or
import Profanease from 'profanease'
```

# Example Usage   

```js   
var isProfane = new Profanease({lang : 'all'});
//Multilingual support for word filtering
//{lang : 'all'} represents all language word filter
//Available language are ['ar','cs','da','en','eo','es','fa','fi','fr','hi','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','zh']

//profanity check returns boolen
console.log(isProfane.check("Don't be an ash0le")); //true

//profanity clean returns cleaned word
console.log(isProfane.clean("Don't be an ash0le")); //Don't be an ******

```
Note: Default value for Profanease { lang : 'all', placeHolder: '*' }.

**Placeholder Overrides**
```js   
var isProfane = new Profanease({ placeHolder: 'x'});
isProfane.clean("Don't be an ash0le"); //Don't be an xxxxxx
```

**Regex Overrides**
```js
var isProfane = new Profanease({ regex: /\*|\.|$/gi });
var isProfane = new Profanease({ replaceRegex:  /[A-Za-z0-9가-힣_]/g }); 
```

**Add words to the blacklist**
```js
var isProfane = new Profanease(); 
isProfane.addWords(['some', 'bad', 'word']);
isProfane.clean("some bad word!") //**** *** ****!
isProfane.check("some bad word!") //true

//or

var isProfane = new Profanease({ list: ['some', 'bad', 'word'] }); 
isProfane.clean("some bad word!") //**** *** ****!
isProfane.check("some bad word!") //true
```

**Instantiate with an empty list**
```js
var isProfane = new Profanease({ emptyList: true }); 
isProfane.clean('hell this wont clean anything'); //hell this wont clean anything
isProfane.clean('hell this wont clean anything'); //false
```

**Remove words from the blacklist**
```js
var isProfane = new Profanease();    
isProfane.removeWords(['hells', 'sadist']);
isProfane.clean("some hells word!"); //some hells word!
isProfane.check("some hells word!"); //false
```

**Exclude words from the profanity list**
```js
var isProfane = new Profanease({ exclude: ['ash0le'] });  
isProfane.clean("Don't be an ash0le"); //Don't be an ash0le
isProfane.check("Don't be an ash0le"); //false
```

**Export words list with language**
```js
var isProfane = new Profanease();    
isProfane.wordsList('all'); // [ "Asesinato", "*shit*"...]
isProfane.wordsList('en'); // [ "*dyke", "*shit*"...]
isProfane.wordsList('es'); // [ "Asesinato", "Bollera",..]
// on error lang is 'all'
```

