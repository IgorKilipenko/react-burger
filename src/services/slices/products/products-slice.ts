import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import {
  api,
  BurgerIngredientType,
  CategoryBase,
  DbObjectType,
  IngredientBase,
  IngredientsTableView,
  parseRawIngredientsData as normalizeRawIngredientsData,
} from "../../../data"

export const getAllIngredients = createAsyncThunk("products/getAllIngredients", async (_, thunkApi) => {
  thunkApi.dispatch(clearProducts())
  const { data, error } = await api.getAllIngredients({ signal: thunkApi.signal })
  if (error || !data?.success) throw error ?? Error(data?.message ?? "Error.")
  return { data, error }
})

type Response = Awaited<ReturnType<typeof api.getAllIngredients>>

interface OrderResponseState {
  ingredients?: NonNullable<Response["data"]>["data"] | null
  error?: SerializedError | null
  loading: boolean
}

export type ProductBaseType = IngredientBase & DbObjectType
export type CategoriesBaseType = CategoryBase
export type ProductsListType<T extends ProductBaseType> = IngredientsTableView<T>
export type CategoriesListType<T extends CategoriesBaseType> = T[]

export interface ProductsContextType<TProduct extends ProductBaseType, TCategory extends CategoriesBaseType> {
  products?: ProductsListType<TProduct> | null
  categories?: CategoriesListType<TCategory> | null
}

const initialState: ProductsContextType<BurgerIngredientType, CategoriesBaseType> &
  Omit<OrderResponseState, "ingredients"> = {
  products: null,
  categories: null,
  error: null,
  loading: false,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIngredients.fulfilled, (state, { payload }: PayloadAction<Response>) => {
      console.assert(payload.data?.data)

      const { table: products, categories } = normalizeRawIngredientsData(payload.data?.data ?? [])
      state.products = products
      state.categories = categories
      state.loading = false
    })
    builder.addCase(getAllIngredients.rejected, (state, { error }) => {
      state.products = initialState.products
      state.categories = initialState.categories
      state.error = error
      state.loading = false
    })
    builder.addCase(getAllIngredients.pending, (state) => {
      state.error = initialState.error
      state.loading = true
    })
  },
})

export const productsReducer = productsSlice.reducer
export const { clearProducts } = productsSlice.actions
