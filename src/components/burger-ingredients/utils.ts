import { allowableCategories, BurgerIngredientType, IngredientsTableView } from "../../data"

export const selectIngredients = (
  ingredients: IngredientsTableView,
  bunId: string = allowableCategories.bun,
  maxIngredientsCount: number = 3,
  maxQuantity: number = 2
) => {
  const randomIndex = (val: any[] | number) => Math.floor(Math.random() * (Array.isArray(val) ? val!.length : val))

  const bun = ingredients[bunId] ? { item: ingredients[bunId][randomIndex(ingredients[bunId])], quantity: 1 } : null
  const innerIngredients = Object.keys(ingredients)
    .filter((key) => key !== bunId)
    .reduce<{ item: BurgerIngredientType; quantity: number }[]>((res, key) => {
      res.push(
        ...ingredients[key]
          .slice(0, randomIndex(Math.min(ingredients[key].length, maxIngredientsCount + 1)))
          .map((ingredient) => ({ item: ingredient, quantity: randomIndex(maxQuantity) + 1 }))
      )
      return res
    }, [])
  return [...(bun ? [bun] : []), ...innerIngredients]
}
