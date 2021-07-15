import './App.css';

import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"

import Table from './Table';

function App(props) {

  const { history } = props


  return (
    <div className="App">
     <Switch>
        <Route exact history={history} path='/table' component={Table} />
        <Redirect exact from='/' to='/table' />
      </Switch>
    </div>
  );
}

export default withRouter(App);
