import { CartListItemType } from "../../context/cart/cart-context"
import { BurgerIngredientType, IngredientsTableView } from "../../data"

export const selectIngredients = (
  ingredients: IngredientsTableView,
  bunId: string = "bun"
): CartListItemType<BurgerIngredientType>[] => {
  const randomIndex = (val: any[] | number) => Math.floor(Math.random() * (Array.isArray(val) ? val!.length : val))

  const bun = { item: ingredients[bunId][randomIndex(ingredients[bunId])], quantity: 1 }
  const innerIngredients = Object.keys(ingredients)
    .filter((key) => key !== bunId)
    .reduce<CartListItemType<BurgerIngredientType>[]>((res, key) => {
      res.push(
        ...ingredients[key]
          .slice(Math.floor(randomIndex(ingredients[key])))
          .map((ingredient) => ({ item: ingredient, quantity: randomIndex(4) }))
      )
      return res
    }, [])
  return [bun, ...innerIngredients]
}
