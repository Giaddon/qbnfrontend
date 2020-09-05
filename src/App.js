/** The primary app component.
 * Routes users to the game or create components.
 */

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Game from './game/Game';
import Create from './create/Create';

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
      </BrowserRouter>
    </div>
  );
}  


export default App;
