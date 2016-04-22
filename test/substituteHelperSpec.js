const expect = require('chai').expect
const substituteHelper = require('../lib/substituteHelper')
const _ = require('lodash')

describe('substituteHelper', function () {
  it('works in trivial case', function () {
    const input = 'great';
    const pattern = '#';
    const matcherFn = function (input) { return {match: input} }
    // nonMatcherFn must return an array
    const nonMatcherFn = function (input) { return [input]}
    const result = substituteHelper(input, pattern, matcherFn, nonMatcherFn, nonMatcherFn)
    expect(result).to.deep.equal([input]);
  })

  it('works in non-trivial case', function () {
    const input = 'how #great yes \nits #nice'
    const pattern = /(#[a-z\d][\w-]*)/ig // pattern for hashtag
    const matcherFn = function (input) { return {match: _.toUpper(input)} };
    const nonMatcherFn = function (input) { return [input] }
    const result = substituteHelper(input, pattern, matcherFn, nonMatcherFn, nonMatcherFn)
    const expected = ['how ', {match: '#GREAT'}, ' yes \nits ', {match: '#NICE'}, '']
    expect(result).to.deep.equal(expected)
  })
})