import React from "react"

export interface LinkProps {
  icon?: React.ElementType<any>
  text?: string
  children?: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  value?: string | number
}

declare const Link: React.FC<LinkProps>

export { Link }
