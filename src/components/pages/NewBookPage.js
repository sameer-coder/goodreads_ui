import React from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import SearchBookForm from "../forms/SearchBookForm";
import BookForm from "../forms/BookForm";

class NewBookPage extends React.Component {
  state = {
    book: null
  };

  onBookSelect = book => {
    this.setState({ book });
    axios
      .get(`/api/books/fetchPages?goodreadsId=${book.goodreadsId}`)
      .then(res =>  { 
        const bookInfo = {};
        bookInfo.pages = res.data.pages;
        bookInfo.description = res.data.description;
        bookInfo.averageRating = res.data.averageRating;
        return bookInfo;
      })
      .then(bookInfo => this.setState({ book: { ...book, "pages": bookInfo.pages, "description": bookInfo.description, "averageRating": bookInfo.averageRating } }));
  };

  formStyle = {
    "marginTop": "50px",
    "width": "60%",
    "marginLeft": "150px",
    "background": "#F9F9F9",
  }

  render() {
    return (
      <Segment style={this.formStyle}>
        <h1>Search for Books on Goodreads</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        {this.state.book && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}


export default connect()(NewBookPage);
