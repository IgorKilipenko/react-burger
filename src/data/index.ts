export const apiClientConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  endpoints: {
    orders: "api/orders",
    ingredients: "api/ingredients",
  },
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

export type IngredientsTableViewKeyType = CategoryBase["id"]
export interface IngredientsTableView<T extends IngredientBase & DbObjectType = BurgerIngredientType> {
  [key: IngredientsTableViewKeyType]: T[]
}

export const categoryMapper = (categoryRaw: string) => {
  const ingredientCategories = {
    bun: "булки",
    sauce: "соусы",
    main: "начинки",
  }

  return ingredientCategories[categoryRaw as keyof typeof ingredientCategories]
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
