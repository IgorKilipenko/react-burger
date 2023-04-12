import React, { useContext } from "react"
import styles from "./promo-button.module.css"
import closeIcon from "../../images/close.svg"
import { PromoContext } from "../../services/productsContext"
import { DiscountContext } from "../../services/appContext"

export const PromoButton = ({ children, extraClass }) => {
  const { setPromo } = useContext(PromoContext)
  const { setDiscount } = useContext(DiscountContext)
  const cancelPromo = () => {
    setPromo("")
    setDiscount(null)
  }
  return (
    <button type="button" className={`${styles.button} ${extraClass}`} onClick={cancelPromo}>
      {children}
      <img className={styles.close} src={closeIcon} alt="кнопка закрытия" />
    </button>
  )
}
