import React from "react"
import { getBurgerStore } from "../services/slices/burger-constructor"
import { useAppSelector } from "../services/store"

export const useCalculateTotalBurgerPrice = () => {
  const { products: selectedIngredients, bun: selectedBun } = useAppSelector(getBurgerStore)

  const price = React.useMemo(
    () =>
      (selectedBun ? [...Array(2).fill(selectedBun), ...selectedIngredients] : selectedIngredients).reduce<number>(
        (res, curr) => (res += curr.product.price),
        0
      ),
    [selectedBun, selectedIngredients]
  )

  return price
}
