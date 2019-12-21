import React, {Fragment} from 'react';
import Container from "reactstrap/es/Container";
import {Route, Switch} from "react-router-dom";

import Navigation from "./components/UI/Navigation/Navigation";
import Quotes from './containers/Quotes'
import AddQuote from "./containers/AddQuote";

const App = () => {
  return (
      <Fragment>
        <Navigation/>
        <Container>
          <Switch>
            <Route path='/' exact component={Quotes}/>
            <Route path='/add-quote/' exact component={AddQuote}/>
            <Route render={()=> <h1>Not found</h1>}/>
          </Switch>
        </Container>
      </Fragment>
  );
};

export default App;