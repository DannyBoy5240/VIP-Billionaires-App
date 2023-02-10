export const defaultTheme = () => {
  return 'light'
}

export const setNativeTheme = () => {
  // Do nothing
}

export const subscribeTheme = theme => {
  setNativeTheme(theme)
}
