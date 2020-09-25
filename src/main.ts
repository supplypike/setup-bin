import * as core from '@actions/core'
import {chmodSync} from 'fs'
import {getConfig} from './config'
import {getTool} from './tool'

async function run(): Promise<void> {
  try {
    const config = getConfig()
    const tool = await getTool(config)
    core.addPath(tool)
    chmodSync(tool, '755')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
