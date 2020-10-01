/** The primary app component.
 * Routes users to the game or create components.
 */

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Game from './game/Game';
import Create from './create/Create';
import Data from './datapage/Data';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          <Game />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/data">
          <Data />
        </Route>
      </BrowserRouter>
    </div>
  );
}  


export default App;
