import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import {Config} from './config'
import {extract} from './extract'
import {tmpdir} from 'os'
import {lstatSync} from 'fs'
import path from 'path'

export async function getTool(config: Config): Promise<string> {
  process.env.RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACHE || tmpdir()
  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP || tmpdir()

  const outPath = (p: string): string => {
    if (config.subPath) {
      return path.join(p, config.subPath)
    }
    return p
  }

  const cachedPath = tc.find(config.name, config.version)
  if (cachedPath) {
    return outPath(cachedPath)
  }

  const download = await tc.downloadTool(config.uri)
  const extractedPath = await extract(config.uri, download)
  core.info(extractedPath)

  if (lstatSync(extractedPath).isDirectory()) {
    const p = await tc.cacheDir(extractedPath, config.name, config.version)
    return outPath(p)
  }
  return await tc.cacheFile(
    extractedPath,
    config.name,
    config.name,
    config.version
  )
}
