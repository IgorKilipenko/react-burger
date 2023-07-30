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
      tag: routesInfo.home.path,
      get element() {
        return (props: LinkBuilderProps) => (
          <Link to={this.tag} icon={BurgerIcon} text="Конструктор" value={this.tag} {...props} />
        )
      },
    },
    orderList: {
      tag: "orderList",
      get element() {
        return (props: LinkBuilderProps) => (
          <Link to={this.tag} icon={ListIcon} text="Лента заказов" value={this.tag} {...props} />
        )
      },
    },
    homeLink: {
      tag: routesInfo.home.path,
      get element() {
        return (props: LinkBuilderProps) => (
          <Link to={this.tag} value={this.tag} {...props}>
            <ResponsiveLogo breakpoint={"md"} />
          </Link>
        )
      },
    },
    userProfile: {
      tag: routesInfo.profile.path,
      validTags: [
        routesInfo.login.path,
        routesInfo.profile.path,
        routesInfo.register.path,
        routesInfo.forgotPassword.path,
        routesInfo.resetPassword.path,
        routesInfo.ordersBoard.path,
        routesInfo.ordersBoardItem.path,
      ],
      get element() {
        return (props: LinkBuilderProps) => (
          <Link to={this.tag} icon={ProfileIcon} text="Личный кабинет" value={this.tag} {...props} />
        )
      },
    },
  }
}
