import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { useRouteMatch, Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import DeckView from "./DeckView";
import AddCard from "./AddCard";
import Deck from "./Deck";
import DeckEdit from "./DeckEdit";
import CardEdit from "./CardEdit";
import AddDeck from "./AddDeck";

function Layout() {
  const {url, path} = useRouteMatch();
  return (
    <div>
      <Header />

      {/* TODO: Implement the screen starting here */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Link to={`${url}decks/new`} class="btn btn-secondary">
              Create Deck
            </Link>
            <Home />
          </Route>
          <Route path={`${path}decks/new`}>
            <AddDeck />
          </Route>
          <Route path={`${path}decks/:deckId/study`}>
            <DeckView />
          </Route>
          <Route path={`${path}decks/:deckId/cards/new`}>
            <AddCard />
          </Route>
          <Route path={`${path}decks/:deckId/edit`}>
            <DeckEdit />
          </Route>
          <Route path={`${path}decks/:deckId/cards/:cardId/edit`}>
            <CardEdit />
          </Route>
          <Route path={`${path}decks/:deckId`}>
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Layout;
