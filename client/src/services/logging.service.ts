const logsEnabled = true

export const log = (message?: any, ...optionalParams: any[]) => {
  if (logsEnabled) {
    console.log(message, ...optionalParams)
  }
}
