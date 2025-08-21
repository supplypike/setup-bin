import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {chmod, readdir, stat} from 'fs/promises'
import {join} from 'path'
import {getConfig} from './config'
import {getTool} from './tool'

async function chmodRecursive(path: string, mode: number): Promise<void> {
  try {
    await chmod(path, mode)
    const stats = await stat(path)

    if (stats.isDirectory()) {
      const entries = await readdir(path)
      await Promise.all(
        entries.map(entry => chmodRecursive(join(path, entry), mode))
      )
    }
  } catch (error) {
    throw new Error(`Failed to chmod ${path}: ${error}`)
  }
}

async function run(): Promise<void> {
  try {
    const config = getConfig()
    const tool = await getTool(config)

    if (config.command) {
      core.info(`running install command in workdir ${tool}`)
      await exec.exec(config.command, [], {
        cwd: tool
      })
    } else {
      core.info(`adding to path: ${tool}`)
      await chmodRecursive(tool, 0o0755)
      core.addPath(tool)
    }
  } catch (error) {
    core.setFailed(error as Error)
  }
}

run()
