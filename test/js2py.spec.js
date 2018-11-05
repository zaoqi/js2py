'use strict'

const test = require('tape')
const JS2Py = require('../src/js2py')

const f = new JS2Py()

test('variable declarator', (t) => {
  t.plan(1)
  t.equal(f.convert('var a = 1'), 'a = 1')
})

test('const declarator', (t) => {
  t.plan(1)
  t.equal(f.convert('const a = 1'), 'a = 1')
})

test('destructure declarator', (t) => {
  t.plan(2)
  t.equal(f.convert('const [a] = 1'), '[ a ] = 1')
  t.equal(f.convert('const [a, b] = [1, 2]'), '[ a, b ] = [ 1, 2 ]')
})

test('class ', (t) => {
  t.plan(2)
  t.equal(f.convert('class A {}'), `class A:
  pass
`)
  t.equal(f.convert('class A extends B {}'), `class A(B):
  pass
`)
})

test('math', (t) => {
  t.plan(1)
  t.equal(f.convert('offset * (period - 1)'), `offset * (period - 1)`)
})

test('if', (t) => {
  t.plan(1)
  t.equal(f.convert('if (true) { a() } else { b() }'), `if true:
  a()
else:
  b()`)
})

test('for as while', (t) => {
  t.plan(1)
  t.equal(f.convert('for (let i = 0, j = 1; i < j; i += 1) {}'), `i = 0
j = 1
while i < j:
  pass
  i += 1
`)
})

test('for range', (t) => {
  t.plan(1)
  t.equal(f.convert('for (let i = 0; i < period; i++) {}'), 'for i in range(0, period):\n  pass\n')
})

test('function', (t) => {
  t.plan(1)
  t.equal(f.convert('a()'), 'a()')
})

test('sample code', (t) => {
  t.plan(1)
  t.equal(f.convert(`
const m = offset * (period - 1)
const s = period / sigma
let windowSum = 0
let sum = 0
if (prevClose > high) {
  er = minus(prevClose)
} else {
  er = minus(low)
}
 `), `m = offset * (period - 1)
s = period / sigma
windowSum = 0
sum = 0
if prevClose > high:
  er = minus(prevClose)
else:
  er = minus(low)`)
})