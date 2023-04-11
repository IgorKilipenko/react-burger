import React from "react"
import { ProfileIcon, BurgerIcon, ListIcon } from "../common/icons"
import { Link } from "../common"
import { ResponsiveLogo } from "../common/logo"

export const buildLinks = () => {
  const initializeLink =
    (element) =>
    ({ isActive, onClick }) =>
      React.cloneElement(element, {
        isActive,
        onClick: (value) => {
          onClick && onClick(value)
        },
      })

  return {
    burgerConstructor: {
      tag: "burgerConstructor",
      get element() {
        return initializeLink(<Link icon={BurgerIcon} text="Конструктор" value={this.tag} />)
      },
    },
    orderList: {
      tag: "orderList",
      get element() {
        return initializeLink(<Link icon={ListIcon} text="Лента заказов" value={this.tag} />)
      },
    },
    homeLink: {
      tag: "homeLink",
      get element() {
        return initializeLink(
          <Link>
            <ResponsiveLogo breakpoint={"md"} value={this.tag} />
          </Link>
        )
      },
    },
    userProfile: {
      tag: "userProfile",
      get element() {
        return initializeLink(<Link icon={ProfileIcon} text="Личный кабинет" value={this.tag} />)
      },
    },
  }
}
