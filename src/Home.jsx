import React from "react";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import BoardsList from "./components/BoardsList";
import Board from "./components/ui/Board";
// import { Button } from "@material-ui/core";

export default function BasicExample() {
  return (
    <BrowserRouter>
      {/* <Link to="/">
        <Button color="primary">Home</Button>
      </Link> */}
      <Switch>
        <Route exact path="/">
          <BoardsList />
        </Route>
        <Route exact path="/boards/:board_id">
          <Board />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
