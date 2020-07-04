import React from "react";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import BoardsList from "./components/BoardsList";
import Board from "./components/ui/Board";

export default function BasicExample() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Link to="/">
          <button>Home</button>
        </Link>

        <Switch>
          <Route exact path="/">
            <BoardsList />
          </Route>
          <Route exact path="/home">
            <BoardsList />
          </Route>
          <Route exact path="/boards">
            <BoardsList />
          </Route>
          <Route exact path="/boards/:board_id">
            <Board />
          </Route>
          <Route exact path="/boards/:board_id/:card_id">
            <div>Single card</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}
