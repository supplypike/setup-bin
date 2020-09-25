import * as tc from '@actions/tool-cache'
import {tmpdir} from 'os'

export async function extract(uri: string, file: string): Promise<string> {
  const path = tmpdir()
  if (uri.endsWith(`.tar.gz`)) {
    return await tc.extractTar(file, path)
  }
  if (uri.endsWith(`.pkg`)) {
    return await tc.extractXar(file, path)
  }
  if (uri.endsWith(`.7z`)) {
    return await tc.extract7z(file, path)
  }
  if (uri.endsWith(`.zip`)) {
    return await tc.extractZip(file, path)
  }

  return file
}
