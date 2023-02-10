import React from 'react'

export const ThemeContext = React.createContext({ theme: 'light' })

export function withTheme(Component) {
  const ThemedComponent = props => (
    <ThemeContext.Consumer>
      {contexts => <Component {...props} {...contexts} />}
    </ThemeContext.Consumer>
  )
  return ThemedComponent
}

export const useTheme = () => React.useContext(ThemeContext)
