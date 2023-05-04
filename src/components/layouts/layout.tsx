import React from "react"
import AppHeader from "../app-header"
import theme from "../../theme/theme"
import { MainContainer } from "../app/main-container"
import { Outlet } from "react-router-dom"

export const Layout: React.FC = () => {
  const [headerHeight, setHeight] = React.useState(0)
  const maxContentWidth = theme.sizes.container.maxContentWidth

  const handleHeaderChangeHeight = (value: number) => {
    setHeight(value)
  }

  return (
    <>
      <AppHeader onChangeHeight={handleHeaderChangeHeight} />
      <MainContainer maxContentWidth={maxContentWidth} height={`calc(100% - ${headerHeight}px)`}>
        <Outlet />
      </MainContainer>
    </>
  )
}