import React from "react"

export interface AppHeaderProps {
  variant?: string
  onChangeHeight: (value: number) => void
}

declare const AppHeader: React.FC<AppHeaderProps>;

export default AppHeader;
