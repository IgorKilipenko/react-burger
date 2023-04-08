import React from "react"

export interface AppHeaderProps {
  variant?: string
  onChangeHeight: (value: number) => void
}

//export function AppHeader:React.FC<AppHeaderProps>({ variant = "desktop", onChangeHeight }) 

declare const AppHeader: React.FC<AppHeaderProps>;

export default AppHeader;
