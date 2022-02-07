import React from 'react';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/"> 
        This is home page
        </Route>
      </Switch>
      hi
    </div>
  );
}

export default App;
