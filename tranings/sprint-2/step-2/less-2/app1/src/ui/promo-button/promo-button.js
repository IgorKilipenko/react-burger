import React from "react"
import styles from "./promo-button.module.css"
import closeIcon from "../../images/close.svg"

export const PromoButton = ({ children, extraClass, setPromo, setDiscount, onDiscountApply }) => {
  const cancelPromo = () => {
    setDiscount && setDiscount()
    setPromo && setPromo("")
    onDiscountApply && onDiscountApply(0)
  }

  return (
    <button type="button" className={`${styles.button} ${extraClass}`} onClick={cancelPromo}>
      {children}
      <img className={styles.close} src={closeIcon} alt="кнопка закрытия" />
    </button>
  )
}
