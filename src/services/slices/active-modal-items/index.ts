import { RootState } from "../../store"

export {
  activeModalItemReducer,
  setActiveIngredient,
  clearActiveIngredient,
  setActiveOrdersListItem,
  clearActiveOrdersListItem,
  setActiveOrdersFeedItem,
  clearActiveOrdersFeedItem,
} from "./active-modal-item-slice"

export const getActiveModalItemStore = (state: RootState) => state.activeModalItem
export const getActiveIngredientFromModalStore = (state: RootState) => state.activeModalItem.activeIngredient
