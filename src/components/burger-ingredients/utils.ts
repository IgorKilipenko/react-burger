import { CartItemType } from "../../context/cart/cart-context"
import { BurgerIngredientType, IngredientsTableView } from "../../data"

export const selectIngredients = (
  ingredients: IngredientsTableView,
  bunId: string = "bun",
  maxQuantity: number = 3
): CartItemType<BurgerIngredientType>[] => {
  const randomIndex = (val: any[] | number) => Math.floor(Math.random() * (Array.isArray(val) ? val!.length : val))

  const bun = ingredients[bunId] ? { item: ingredients[bunId][randomIndex(ingredients[bunId])], quantity: 1 } : null
  const innerIngredients = Object.keys(ingredients)
    .filter((key) => key !== bunId)
    .reduce<CartItemType<BurgerIngredientType>[]>((res, key) => {
      res.push(
        ...ingredients[key]
          .slice(0, randomIndex(Math.min(ingredients[key].length, maxQuantity)))
          .map((ingredient) => ({ item: ingredient, quantity: randomIndex(4) + 1 }))
      )
      return res
    }, [])
  return [...(bun ? [bun] : []), ...innerIngredients]
}
