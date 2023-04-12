import React from "react"
import { Tabs } from "./tabs"
import { ProductsContainer } from "./products-container"

export const Cart = ({ setTotalPrice, setDiscount }) => {
  return (
    <section>
      <Tabs />
      <ProductsContainer onCalculateTotalPrice={setTotalPrice} onDiscountApply={setDiscount} />
    </section>
  )
}
