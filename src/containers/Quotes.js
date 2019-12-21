import React, {Component} from 'react';
import {Button, Card, CardBody, CardText, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {CATEGORIES} from '../constants';
import {Link, NavLink} from "react-router-dom";
import axiosApi from "../axios-api";
import Spinner from "../components/UI/Spinner/Spinner";


class Quotes extends Component {
  state = {
    quotes: [],
    loading: false,
  };
  getData = async ()=> {
    let url = '/quotes.json';

    if(this.props.match.params.name) {
      url += `?orderBy="category"&equalTo="${this.props.match.params.name}"`
    }
    this.setState({loading: true});

    const response = await axiosApi.get(url);

    if (response) {
      this.setState({quotes: response.data, loading: false})
    }
  };
  async componentDidMount (){
    this.getData();
  };
  componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      return this.getData();
    }
  }
  deleteQuote = async (id) =>{

    this.setState({loading: true});

    await axiosApi.delete(`/quotes/${id}.json`);

    this.getData();
    this.props.history.push('/');
  };
  render() {
    let quotes = (Object.keys(this.state.quotes).map(id=>(
        <Card key={id} style={{margin: '5px'}}>
          <CardBody>
            <CardText>
              "{this.state.quotes[id].text}"
              <br/>
              <span><b>-{this.state.quotes[id].author}</b></span>
            </CardText>
            <Button size="sm"
                    tag={Link}
                    to={`/quotes/${id}/edit/`}
                    style={{marginRight: '5px'}}
                    color='primary'
            >
              Edit >>
            </Button>
            <Button size="sm"
                    color='danger'
                    onClick={()=>this.deleteQuote(id)}
            >Delete
            </Button>
          </CardBody>
        </Card>
    )));

    if (Object.entries(this.state.quotes).length === 0 ) {
      quotes = <h1>The are no quotes in this category!</h1>;
    }

    return (
        <Row style={{paddingTop: '25px', paddingBottom: '25px'}}>
          <Col xs={4}>
            <ListGroup>
              {CATEGORIES.map(c=>(
                  <ListGroupItem key={c.id}>
                    <NavLink to={'/categories/'+ c.id}>{c.title}</NavLink>
                  </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col xs={8}>
            {!this.state.loading ? quotes : <Spinner/>}
          </Col>
        </Row>
    );
  }
}

export default Quotes;