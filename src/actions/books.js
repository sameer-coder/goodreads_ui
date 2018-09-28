import { normalize } from "normalizr";
import { BOOKS_FETCHED } from "../types";
import api from "../api";
import { bookSchema } from "../schemas";

// data.entities.books
const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
});


const fetchBooks = () => dispatch =>
  api.books
    .fetchAll()
    .then(books => dispatch(booksFetched(normalize(books, [bookSchema]))));

export default fetchBooks;