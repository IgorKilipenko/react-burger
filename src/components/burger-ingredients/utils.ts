import { CartItemType } from "../../context/cart/cart-context"
import { BurgerIngredientType, IngredientsTableView } from "../../data"

export const selectIngredients = (
  ingredients: IngredientsTableView,
  bunId: string = "bun"
): CartItemType<BurgerIngredientType>[] => {
  const randomIndex = (val: any[] | number) => Math.floor(Math.random() * (Array.isArray(val) ? val!.length : val))

  const bun = { item: ingredients[bunId][randomIndex(ingredients[bunId])], quantity: 1 }
  const innerIngredients = Object.keys(ingredients)
    .filter((key) => key !== bunId)
    .reduce<CartItemType<BurgerIngredientType>[]>((res, key) => {
      res.push(
        ...ingredients[key]
          .slice(0, randomIndex(Math.min(ingredients[key].length, 10)))
          .map((ingredient) => ({ item: ingredient, quantity: randomIndex(4) + 1 }))
      )
      return res
    }, [])
  return [bun, ...innerIngredients]
}
