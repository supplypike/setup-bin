import * as tc from '@actions/tool-cache'

export async function extract(uri: string, file: string): Promise<string> {
  if (uri.endsWith(`.tar.gz`) || uri.endsWith(`.tgz`)) {
    return await tc.extractTar(file)
  }
  if (uri.endsWith(`.pkg`)) {
    return await tc.extractXar(file)
  }
  if (uri.endsWith(`.7z`)) {
    return await tc.extract7z(file)
  }
  if (uri.endsWith(`.zip`)) {
    return await tc.extractZip(file)
  }

  return file
}
