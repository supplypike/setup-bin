import * as core from '@actions/core'
import * as exec from '@actions/exec'
import chmodr from 'chmodr'
import {getConfig} from './config'
import {getTool} from './tool'
import path from 'path'

async function run(): Promise<void> {
  try {
    const config = getConfig()
    let tool = await getTool(config)
    if (config.subPath) {
      tool = path.join(tool, subPath) 
    }

    if (config.command) {
      core.info(`running install command in workdir ${tool}`)
      await exec.exec(config.command, [], {
        cwd: tool
      })
    } else {
      core.info(`adding to path: ${tool}`)
      chmodr(tool, 0o0755, err => {
        if (err) {
          throw err
        }
      })
      core.addPath(tool)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
