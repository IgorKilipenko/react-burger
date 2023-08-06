import { useAppSelector } from "../services/store"
import { getProductsFromProductsStore } from "../services/slices/products"
import { BurgerIngredientType, DbObjectType } from "../data"

export const useGetProductsByIds = (ids: DbObjectType["_id"][] | string[]) => {
  const ingredients = useAppSelector(getProductsFromProductsStore)

  return !ingredients
    ? null
    : ids.reduce<Record<DbObjectType["_id"], { element: BurgerIngredientType; count: number }>>((res, id) => {
        const ingredient = Object.values(ingredients).reduce<BurgerIngredientType | null>((res, items) => {
          if (res) {
            return res
          }
          res = items.find((x) => x._id === id) ?? null
          return res
        }, null)
        if (ingredient) {
          res[id] = { element: ingredient, count: res[ingredient._id] ? res[ingredient._id].count + 1 : 1 }
        }
        return res
      }, {})
}
