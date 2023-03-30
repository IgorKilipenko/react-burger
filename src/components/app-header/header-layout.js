import React from 'react'
import { Box } from '../common'

const HeaderItem = ({ children, ...otherProps }) => {
  return <Box {...otherProps}>{children}</Box>
}

const HeaderLayout = ({ children }) => {
  const count = React.Children.count(children)
  return (
    <>
      {React.Children.map(children, (item, i) => (
        <HeaderItem key={i} style={{ flexBasis: `${100 / count}%` }}>
          {item}
        </HeaderItem>
      ))}
    </>
  )
}

export default HeaderLayout
export { HeaderItem }
