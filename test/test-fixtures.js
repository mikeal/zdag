import create from './fixtures/index.js'
import createR2D2 from '../index.js'
import multiformats from 'multiformats/basics'
import base58 from 'multiformats/bases/base58'
import { deepStrictEqual as same } from 'assert'

multiformats.multibase.add(base58)

const r2d2 = createR2D2(multiformats)

const validate = (value, key, compress) => {
  const encoded = r2d2.encode(value, compress)
  const decoded = r2d2.decode(encoded, compress)
  same(decoded, value)
  return encoded
}

export default async test => {
  const fixtures = await create()
  for (const [key, value] of Object.entries(fixtures)) {
    test(`fixture: ${key}`, () => validate(value, key))
  }
  for (const [key, value] of Object.entries(fixtures)) {
    test(`fixture compressed: ${key}`, () => validate(value, key, true))
  }
}
