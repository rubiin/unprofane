import Profanease from '../src/index';
import * as wordList from '../src/language.loader';
import { describe, expect, test } from 'vitest';


test('Profanease: Default', () => {
  let isProfane = new Profanease({ lang: 'en' });
  expect(isProfane.censor('I am fucking asshole')).toEqual('I am ******* *******');
});

test('Profanease:Clean lang :en', () => {
  let isProfane = new Profanease({ lang: 'en' });
  expect(isProfane.censor("Don't be an ash0le")).toEqual("Don't be an ******");
});

test('Profanease:Check lang :en', () => {
  let isProfane = new Profanease({ lang: 'en' });
  expect(isProfane.check("Don't be an ash0le")).toBe(true);
});


test('Profanease: placeHolder :x', () => {
  let isProfane = new Profanease({ placeHolder: 'x' });
  expect(isProfane.censor("Don't be an ash0le")).toEqual("Don't be an xxxxxx");
});

test('Profanease: addWords', () => {
  let isProfane = new Profanease();
  isProfane.addWords(['some', 'bad', 'word']);
  expect(isProfane.censor('some bad word!')).toBe('**** *** ****!');
});

test('Profanease: exclude initialize then same addWords', () => {
  let isProfane = new Profanease({ exclude: ['ash0le', 'some', 'bad', 'word'] });
  isProfane.addWords(['some', 'bad', 'word']);
  expect(isProfane.censor('some bad word like ash0le!')).toBe('**** *** **** like ash0le!');
});

test('Profanease:Clean addWords on initialize', () => {
  let isProfane = new Profanease({ list: ['some', 'bad', 'word'] });
  expect(isProfane.censor('some bad word!')).toEqual('**** *** ****!');
});

test('Profanease:Check addWords on initialize', () => {
  let isProfane = new Profanease({ list: ['some', 'bad', 'word'] });
  expect(isProfane.check('some bad word!')).toBe(true);
});

test('Profanease:Clean emptyList:True', () => {
  let isProfane = new Profanease({ emptyList: true });
  expect(isProfane.censor('hell this wont censor anything')).toEqual('hell this wont censor anything');
});

test('Profanease:Check emptyList:True', () => {
  let isProfane = new Profanease({ emptyList: true });
  expect(isProfane.check('hell this wont censor anything')).toBe(false);
});

test('Profanease: emptyList:True and List of array passing', () => {
  let isProfane = new Profanease({ emptyList: true, list: ['some', 'bad', 'word'] });
  expect(isProfane.censor('hell this wont censor anything')).toEqual('hell this wont censor anything');
});

test('Profanease: removeWords', () => {
  let isProfane = new Profanease();
  isProfane.removeWords(['hells', 'sadist']);
  expect(isProfane.censor('some hells word!')).toEqual('some hells word!');
});

test('Profanease: wordsList for es', () => {
  let isProfane = new Profanease();
  expect(isProfane.wordsList('es')).toEqual(expect.arrayContaining(wordList.default.es));
});

test('Profanease: wordsList for en', () => {
  let isProfane = new Profanease();
  expect(isProfane.wordsList()).toEqual(expect.arrayContaining(wordList.default.en));
});
