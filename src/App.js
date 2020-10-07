/** The primary app component.
 * Routes users to the game or create components.
 */

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Game from './play/Game';
import Create from './create/Create';
import Data from './data/Data';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/play">
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
