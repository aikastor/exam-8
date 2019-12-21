import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {CATEGORIES} from "../constants";
import Spinner from "../components/UI/Spinner/Spinner";
import axiosApi from "../axios-api";


class EditQuote extends Component {
  state = {
    author: '',
    text: '',
    category: ''
  };
  async componentDidMount() {

    const id= this.props.match.params.id;
    const response = await axiosApi.get(`/quotes/${id}.json`);
    this.setState({author: response.data.author,
                        text: response.data.text,
                        category: response.data.category})
  };
  inputChangeHandler = e=> this.setState({[e.target.name]: e.target.value});

  formSubmitHandler = async e => {

    e.preventDefault();

    const id= this.props.match.params.id;

    const editedQuote = {
      author: this.state.author,
      text: this.state.text,
      category: this.state.category
    };

    await axiosApi.put(`/quotes/${id}.json`,editedQuote);
    this.props.history.goBack();
  };
  render() {
    return (
        <div>
          <h1>New Post</h1>
          <Form onSubmit={this.formSubmitHandler}>
            <FormGroup>
              <Label for="category">Select category</Label>
              <Input type="select" name="category" id="category" value={this.state.category}
                     onChange={this.inputChangeHandler}>
                {CATEGORIES.map(c=>(<option key={c.id} value={c.id}>{c.title}</option>))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input type="text" name="author" id="author" placeholder="Enter quote author"
                     value={this.state.author}
                     onChange={this.inputChangeHandler}/>
            </FormGroup>
            <FormGroup>
              <Label for="post">Post content</Label>
              <Input type="textarea" name='text' id='text' placeholder="Enter quote text"
                     value={this.state.text}
                     onChange={this.inputChangeHandler}/>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
          {this.state.loading && <Spinner/>}
        </div>
    );
  }
}

export default EditQuote;