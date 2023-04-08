export const apiClientConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  ingredientsPath: "api/ingredients",
}

export interface IngredientBase {
  __id: string
  type: string
}

export interface CategoryBase {
  id: string
  name: string
}

export interface BurgerIngredientType extends IngredientBase {
  name: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export interface IngredientsTableView {
  [key: CategoryBase["id"]]: BurgerIngredientType[]
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
  const table = rawData.reduce<IngredientsTableView>((res, item) => {
    const category = (res[item.type] ??= [])
    category.push(item)
    return res
  }, {})

  const categories = Object.keys(table).map((category) => ({ id: category, name: categoryMapper(category) }))

  return {table, categories}
}
