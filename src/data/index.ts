export const apiClientConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  ingredientsPath: "api/ingredients",
}

export interface DbObjectType {
  _id: string
  __v: number
}

export interface IngredientBase {
  name: string
  type: string
}

export interface CategoryBase {
  id: string
  name: string
}

export interface BurgerIngredientType extends IngredientBase, DbObjectType {
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
}

export interface IngredientsTableView<T extends BurgerIngredientType = BurgerIngredientType> {
  [key: CategoryBase["id"]]: T[]
}

export const categoryMapper = (categoryRaw: string) => {
  const ingredientCategories = {
    bun: "булки",
    sauce: "соусы",
    main: "начинки",
  }

  return ingredientCategories[categoryRaw as keyof typeof ingredientCategories]
}

export function parseRawData<T extends BurgerIngredientType>(rawData: T[]) {
  const table = rawData.reduce<IngredientsTableView<T>>((res, item) => {
    const category = (res[item.type] ??= [])
    category.push(item)
    return res
  }, {})

  const categories = Object.keys(table).map((category) => ({ id: category, name: categoryMapper(category) }))

  return {table, categories}
}
