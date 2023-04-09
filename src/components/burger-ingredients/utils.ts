import { BurgerIngredientType, IngredientsTableView } from "../../data"

export const selectIngredients = (ingredients: IngredientsTableView, bunId: string = "bun") => {
  const randomIndex = (val: any[] | number) => Math.floor(Math.random() * (Array.isArray(val) ? val!.length : val))

  const bun = { ingredient: ingredients[bunId][randomIndex(ingredients[bunId])], count: 1 }
  const innerIngredients = Object.keys(ingredients)
    .filter((key) => key !== bunId)
    .reduce<{ ingredient: BurgerIngredientType; count: number }[]>((res, key) => {
      res.push(
        ...ingredients[key]
          .slice(Math.floor(randomIndex(ingredients[key])))
          .map((ingredient) => ({ ingredient, count: 1 }))
      )
      return res
    }, [])
  return [bun, ...innerIngredients]
}
