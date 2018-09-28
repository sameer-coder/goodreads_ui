import React from "react";
import PropTypes from "prop-types";
import { TextArea, Form, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class BookForm extends React.Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages,
      description: this.props.book.description,
      averageRating: this.props.book.averageRating
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodreadsId: props.book.goodreadsId,
        title: props.book.title,
        authors: props.book.authors,
        cover: props.book.covers[0],
        pages: props.book.pages,
        description: props.book.description,
        averageRating: props.book.averageRating
      },
      covers: props.book.covers
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[newIndex] }
    });
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.authors) errors.authors = "Can't be blank";
    if (!data.pages) errors.pages = "Can't be blank";
    return errors;
  };

  FormStyle = {
    "background": "#FFFFFF",
  }

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment style={this.FormStyle}>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    disabled={data.pages === undefined}
                    type="text"
                    id="pages"
                    name="pages"
                    value={data.pages !== undefined ? data.pages : "Loading..."}
                    onChange={this.onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>

                <Form.Field error={!!errors.description}>
                  <label htmlFor="description">Description</label>
                  <TextArea
                    disabled={data.description === undefined}
                    type="text"
                    rows="5"
                    id="description"
                    name="description"
                    value={data.description !== undefined ? data.description : "Loading..."}
                    onChange={this.onChangeNumber}
                  />
                  {errors.description && <InlineError text={errors.description} />}
                </Form.Field>

                <Form.Field error={!!errors.averageRating}>
                  <label htmlFor="averageRating">Average Rating</label>
                  <input
                    disabled={data.averageRating === undefined}
                    type="text"
                    id="averageRating"
                    name="averageRating"
                    value={data.averageRating !== undefined ? data.averageRating : "Loading..."}
                    onChange={this.onChangeNumber}
                  />
                  {errors.averageRating && <InlineError text={errors.averageRating} />}
                </Form.Field>
                
              </Grid.Column>

              <Grid.Column>
                <Image size="small" src={data.cover} />
                {this.state.covers.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changeCover}>
                    Another cover
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number,
    description: PropTypes.string,
    averageRating: PropTypes.string
  }).isRequired
};

export default BookForm;
