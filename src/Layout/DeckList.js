import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

function DeckList({ deck }) {
    const{url, path} = useRouteMatch();
  function handleDelete() {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      let deckId = deck.id;
      deleteDeck(deckId);
      window.location.reload();
    }
  }

  if (deck.id) {return (
    <div class="container border">
      <div class="d-flex">
        <h3>{deck.name}</h3>
        <p class="pl-2">{deck.cards.length} cards</p>
      </div>
      <p>{deck.description}</p>
      <Link to={`${url}decks/${deck.id}`} class="btn btn-primary">
        View
      </Link>
      <Link to={`${url}decks/${deck.id}/study`} class="btn btn-primary">
        Study
      </Link>
      <button class="btn btn-danger float-end" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
  }
  return 'Loading...'
}

export default DeckList;
