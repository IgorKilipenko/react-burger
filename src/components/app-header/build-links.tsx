import React from "react"
import { ProfileIcon, BurgerIcon, ListIcon } from "../common/icons"
import { Link } from "../common"
import { ResponsiveLogo } from "../common/logo"
import { routesInfo } from "../app-router"

interface LinkBuilderProps {
  isActive?: boolean
  onClick?: (value?: string | number) => void
}

export const buildLinks = () => {
  return {
    burgerConstructor: {
      tag: "burgerConstructor",
      get element() {
        return (props: LinkBuilderProps) => <Link to={routesInfo.home.path} icon={BurgerIcon} text="Конструктор" value={this.tag} {...props} />
      },
    },
    orderList: {
      tag: "orderList",
      get element() {
        return (props: LinkBuilderProps) => <Link icon={ListIcon} text="Лента заказов" value={this.tag} {...props} />
      },
    },
    homeLink: {
      tag: "homeLink",
      get element() {
        return (props: LinkBuilderProps) => (
          <Link value={this.tag} {...props}>
            <ResponsiveLogo breakpoint={"md"} />
          </Link>
        )
      },
    },
    userProfile: {
      tag: "userProfile",
      get element() {
        return (props: LinkBuilderProps) => (
          <Link to={routesInfo.login.path} icon={ProfileIcon} text="Личный кабинет" value={this.tag} {...props} />
        )
      },
    },
  }
}
