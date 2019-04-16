/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const Config = require('../src/index.js')

const mockGet = jest.fn(() => 12)
const mockReload = jest.fn(() => true)
const mockSet = jest.fn(() => true)

jest.mock('../src/Config', () => {
  return jest.fn().mockImplementation(() => {
    return { get: mockGet, reload: mockReload, set: mockSet }
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

let config

describe('Index', () => {
  test('should export a function', () => {
    expect(typeof Config.load).toEqual('function')
  })

  test('load should return object', () => {
    let config = Config.load('pgb')
    expect(typeof config.get).toEqual('function')
    expect(typeof config.set).toEqual('function')
    expect(typeof config.delete).toEqual('function')
  })

  describe('methods', () => {
    beforeEach(() => {
      config = Config.load()
    })

    test('get without args', () => {
      config.get()
      expect(mockGet).toHaveBeenCalledWith(undefined)
    })

    test('get', () => {
      config.get('akey')
      expect(mockGet).toHaveBeenCalledWith('akey')
    })

    test('set', () => {
      expect(config.set('akey', { a: 12 })).toBe(config)
      expect(mockSet).toHaveBeenCalledWith('akey', { a: 12 })
    })

    test('set without key', () => {
      expect(config.set(undefined, { a: 12 })).toBe(config)
      expect(mockSet).toHaveBeenCalledWith(undefined, { a: 12 })
    })

    test('delete', () => {
      expect(config.delete('akey')).toBe(config)
      expect(mockSet).toHaveBeenCalledWith('akey')
    })

    test('delete with no args', () => {
      expect(config.delete()).toBe(config)
      expect(mockSet).toHaveBeenCalledWith(undefined)
    })

    test('reload', () => {
      expect(config.reload()).toBe(config)
      expect(mockReload).toHaveBeenCalledWith()
    })
  })
})