
import React from 'react';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"> 
        This is home page
        </Route>
        <Route>
          this is 404 page
        </Route>
      </Switch>
    </div>
  );
}

export default App;
