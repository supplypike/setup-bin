import {Config} from '../src/config'
import {getTool} from '../src/tool'
import {join} from 'path'
import {tmpdir} from 'os'

test('dowloads and extracts tool', async () => {
  const config: Config = {
    uri: 'https://github.com/docker/compose/releases/download/1.27.4/docker-compose-Linux-x86_64',
    name: 'docker-compose',
    version: '1.27.4'
  }

  const path = await getTool(config)

  expect(path.endsWith('docker-compose/1.27.4/x64')).toBeTruthy()
})

test('dowloads and extracts tool to subpath', async () => {
  const config: Config = {
    uri: 'https://github.com/prometheus/prometheus/releases/download/v2.29.2/prometheus-2.29.2.linux-amd64.tar.gz',
    name: 'prometheus',
    version: '2.29.2',
    subPath: 'prometheus-2.29.2.linux-amd64'
  }

  const path = await getTool(config)

  expect(
    path.endsWith('prometheus/2.29.2/x64/prometheus-2.29.2.linux-amd64')
  ).toBeTruthy()
})


test('dowloads and extracts tool with windows', async () => {
  const config: Config = {
    uri: 'http://downloads.sourceforge.net/gnuwin32/mktemp-1.6-bin.zip',
    name: 'mktemp.exe',
    subPath: 'bin',
    version: '1.6'
  }

  const path = await getTool(config)

  expect(path.endsWith('mktemp/1.6/mktemp.exe')).toBeTruthy()
})
