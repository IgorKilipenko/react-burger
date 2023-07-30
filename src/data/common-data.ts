import { BurgerIngredientType, IngredientsTableView } from "./data-types"

export const allowableCategories = { bun: "bun", sauce: "sauce", main: "main" }

export const ingredientCategoriesMap: Record<keyof typeof allowableCategories, string> = {
  bun: "булки",
  sauce: "соусы",
  main: "начинки",
}

export const categoryMapper = (categoryRaw: string) => {
  return ingredientCategoriesMap[categoryRaw as keyof typeof ingredientCategoriesMap]
}

export function parseRawIngredientsData<T extends BurgerIngredientType>(rawData: T[]) {
  const table = rawData.reduce<IngredientsTableView<T>>((res, item) => {
    const category = (res[item.type] ??= [])
    category.push(item)
    return res
  }, {})

  const categories = Object.keys(table).map((category) => ({ id: category, name: categoryMapper(category) }))

  return { table, categories }
}

export enum OrderStatus {
  complete = "выполнен",
  executing = "готовится",
}
