import {Config} from '../src/config'
import {getTool} from '../src/tool'
import { test, expect } from '@jest/globals'
import fs from 'fs'

test('dowloads and extracts tool', async () => {
  const config: Config = {
    uri: 'https://github.com/docker/compose/releases/download/1.27.4/docker-compose-Linux-x86_64',
    name: 'docker-compose',
    version: '1.27.4'
  }

  const path = await getTool(config)

  expect(path.includes('docker-compose/1.27.4')).toBeTruthy()
  const stats = fs.statSync(path)
  expect(stats.mode & parseInt('755', 8)).toBe(parseInt('755', 8))
})

test('dowloads and extracts tool to subpath', async () => {
  const config: Config = {
    uri: 'https://github.com/prometheus/prometheus/releases/download/v2.29.2/prometheus-2.29.2.linux-amd64.tar.gz',
    name: 'prometheus',
    version: '2.29.2',
    subPath: 'prometheus-2.29.2.linux-amd64'
  }

  const path = await getTool(config)

  expect(path.includes('prometheus/2.29.2')).toBeTruthy()
  expect(path.includes('prometheus-2.29.2.linux-amd64')).toBeTruthy()
})
