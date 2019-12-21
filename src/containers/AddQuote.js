import React, {Component} from 'react';
import {CATEGORIES} from '../constants';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axiosApi from "../axios-api";
import Spinner from "../components/UI/Spinner/Spinner";


class AddQuote extends Component {
  state = {
    author: '',
    text: '',
    category: CATEGORIES[0].id,
    loading: false,
  };
  inputChangeHandler = e => this.setState({[e.target.name]: e.target.value});

  formSubmitHandler = async e => {
    e.preventDefault();

    const newQuote = {
      author: this.state.author,
      text: this.state.text,
      category: this.state.category
    };
    this.setState({loading: true});
    await axiosApi.post('/quotes.json', newQuote);
    this.setState({loading: false});
    this.props.history.push('/');
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
            <Button color='primary'>Submit</Button>
          </Form>
          {this.state.loading && <Spinner/>}
        </div>
    );
  }
}

export default AddQuote;