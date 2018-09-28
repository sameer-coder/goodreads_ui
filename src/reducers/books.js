import BOOKS_FETCHED from "../types";

export default function books(state = {}, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books;