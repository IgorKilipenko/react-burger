import {
  DELETE_ITEM,
  CANCEL_PROMO,
  DECREASE_ITEM,
  INCREASE_ITEM,
  TAB_SWITCH,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
  GET_RECOMMENDED_ITEMS_FAILED,
  GET_RECOMMENDED_ITEMS_SUCCESS,
  GET_RECOMMENDED_ITEMS_REQUEST,
  APPLY_PROMO_FAILED,
  APPLY_PROMO_SUCCESS,
  APPLY_PROMO_REQUEST,
} from "../actions/cart"

const initialState = {
  items: [],

  recommendedItems: [],

  promoCode: "PROMOCODE",
  promoDiscount: 50,

  currentTab: "items",
  itemsRequest: false,
  itemsFailed: false,
  recommendedItemsRequest: false,
  recommendedItemsFailed: false,
  promoRequest: false,
  promoFailed: false,
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: state.currentTab === "items" ? "postponed" : "items",
      }
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map((item) => (item.id === action.id ? { ...item, qty: ++item.qty } : item)),
      }
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map((item) => (item.id === action.id ? { ...item, qty: --item.qty } : item)),
      }
    }
    case DELETE_ITEM: {
      return { ...state, items: [...state.items].filter((item) => item.id !== action.id) }
    }
    case CANCEL_PROMO: {
      return {
        ...state,
        promoCode: "",
        promoDiscount: null,
      }
    }

    case GET_ITEMS_REQUEST: {
      return { ...state, itemsRequest: true }
    }

    case GET_ITEMS_SUCCESS: {
      return { ...state, items: [...action.items], itemsRequest: false, itemsFailed: false }
    }

    case GET_ITEMS_FAILED: {
      return { ...state, itemsRequest: false, itemsFailed: true }
    }

    case GET_RECOMMENDED_ITEMS_REQUEST: {
      return { ...state, recommendedItemsRequest: true }
    }

    case GET_RECOMMENDED_ITEMS_SUCCESS: {
      return {
        ...state,
        recommendedItems: [...action.items],
        recommendedItemsRequest: false,
        recommendedItemsFailed: false,
      }
    }

    case GET_RECOMMENDED_ITEMS_FAILED: {
      return { ...state, recommendedItemsRequest: false, recommendedItemsFailed: true }
    }

    case APPLY_PROMO_REQUEST: {
      return { ...state, promoRequest: true }
    }

    case APPLY_PROMO_SUCCESS: {
      return {
        ...state,
        promoDiscount: action.value.discount,
        promoCode: action.value.code,
        promoRequest: false,
        promoFailed: false,
      }
    }

    case APPLY_PROMO_FAILED: {
      return {
        ...state,
        promoDiscount: null,
        promoCode: "",
        promoRequest: false,
        promoFailed: true,
      }
    }

    default: {
      return state
    }
  }
}
