import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import {Config} from './config'
import {extract} from './extract'
import {tmpdir} from 'os'
import {lstatSync} from 'fs'

export async function getTool(config: Config): Promise<string> {
  process.env.RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACHE || tmpdir()
  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP || tmpdir()

  const cachedPath = tc.find(config.name, config.version)
  if (cachedPath) {
    return cachedPath
  }

  const path = await tc.downloadTool(config.uri)

  const extractedPath = await extract(config.uri, path)
  core.info(extractedPath)

  if (lstatSync(extractedPath).isDirectory()) {
    return await tc.cacheDir(extractedPath, config.name, config.version)
  }
  return await tc.cacheFile(
    extractedPath,
    config.name,
    config.name,
    config.version
  )
}
