import * as core from '@actions/core'
import chmodr from 'chmodr'
import {getConfig} from './config'
import {getTool} from './tool'

async function run(): Promise<void> {
  try {
    const config = getConfig()
    const tool = await getTool(config)
    core.addPath(tool)
    core.info(`toolPath ${tool}`)

    chmodr(tool, 0o0755, err => {
      if (err) {
        throw err
      }
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
