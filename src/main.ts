import * as core from '@actions/core'
import {getConfig} from './config'
import {getTool} from './tool'

async function run(): Promise<void> {
  try {
    const config = getConfig()
    const tool = await getTool(config)
    core.addPath(tool)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
