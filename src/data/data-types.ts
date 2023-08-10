export type DbIndexType = string

export interface DbObjectType {
  _id: DbIndexType
  __v?: number
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

export interface Order extends DbObjectType {
  number: string
  name: string
  status: "done" | "pending" | "created"
  ingredients: DbObjectType["_id"][]
  createdAt: string
  updatedAt: string
}
