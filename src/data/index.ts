import { BurgerIngredientType, IngredientsTableView } from "./data-types"

export { apiConfig as apiClientConfig } from "./api"

export type {
  DbIndexType,
  DbObjectType,
  IngredientBase,
  CategoryBase,
  BurgerIngredientType,
  IngredientsTableViewKeyType,
  IngredientsTableView,
} from "./data-types"

export { api, type ApiOrderIdResponseType } from "./api"

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
