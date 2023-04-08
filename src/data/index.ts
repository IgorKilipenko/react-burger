export const apiClientConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  ingredientsPath: "api/ingredients",
}

export interface IngredientBase {
  __id: string | number
  type: string
}

export interface CategoryBase {
  id: string | number
  name: string
}

export const categoryMapper = (categoryRaw: string) => {
  const ingredientCategories = {
    bun: "булки",
    sauce: "соусы",
    main: "начинки",
  }

  return ingredientCategories[categoryRaw as keyof typeof ingredientCategories]
}

export function getAllCategoriesFromData<T extends IngredientBase>(rawData: T[]): CategoryBase[] {
  console.log('getAllCategoriesFromData', {rawData})
  const categories = rawData.reduce<Set<T["type"]>>((res, item) => {
    res.add(item.type)
    return res
  }, new Set())
  return Array.from(categories).map((category) => ({ id: category, name: categoryMapper(category) }))
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
