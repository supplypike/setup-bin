import {Config} from '../src/config'
import {getTool} from '../src/tool'

test('dowloads and extracts tool', async () => {
  const config: Config = {
    uri:
      'https://github.com/docker/compose/releases/download/1.27.4/docker-compose-Linux-x86_64',
    name: 'docker-compose',
    version: '1.27.4'
  }

  const path = await getTool(config)

  expect(path).toBeTruthy()
})
