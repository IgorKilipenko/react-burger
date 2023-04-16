/* eslint-disable import/prefer-default-export */
import {
  DELETE_ITEM,
  CANCEL_PROMO,
  DECREASE_ITEM,
  INCREASE_ITEM,
  TAB_SWITCH,
  GET_ITEMS_FAILED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST,
} from "../actions/cart"
import { recommendedItems } from "../initialData"

const initialState = {
  items: [],

  recommendedItems,

  promoCode: "PROMOCODE",
  promoDiscount: 50,

  currentTab: "items",
  itemsRequest: false,
  itemsFailed: false,
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
    default: {
      return state
    }
  }
}
