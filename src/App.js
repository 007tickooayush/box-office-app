import React from 'react';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/"> 
        This is home page
        </Route>
      </Switch>
    </div>
  );
}

export default App;
