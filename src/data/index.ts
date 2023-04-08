export const apiClientConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  ingredientsPath: "api/ingredients ",
}

export interface RawDataItemBaseType {
  __id: string | number
  type: string
}

export const categoryMapper = (categoryRaw: string) => {
  const ingredientCategories = {
    bun: "булки",
    sauce: "соусы",
    main: "начинки",
  }

  return ingredientCategories[categoryRaw as keyof typeof ingredientCategories]
}

export function getAllCategoriesFromData<T extends RawDataItemBaseType>(rawData: T[]) {
  const categories = rawData.reduce<Set<RawDataItemBaseType["type"]>>((res, item) => {
    res.add(item.type)
    return res
  }, new Set())
  return Array.from(categories).map((category) => ({ id: category, name: categoryMapper(category) }))
}

export interface BurgerIngredientType extends RawDataItemBaseType {
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

