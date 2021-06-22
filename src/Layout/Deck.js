import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import CardList from "./CardList";

function Deck() {
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);
  useEffect(() => {
    const deckCards = deck.cards;
    if (deck.cards.length > 0) {
      let card = [];
      for (let i = 0; i < deckCards.length; i++) {
        card.push({
          front: deckCards[i].front,
          back: deckCards[i].back,
          id: deckCards[i].id,
          deckId: deckCards[i].deckId,
        });
      }
      setCards(card);
    }
  }, [deck]);
  const card = cards.map((card) => (
    <CardList cards={card} key={card.id} />
  ));
  function handleDelete() {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      let deckId = deck.id;
      deleteDeck(deckId);
      history.push("/");
    }
  }
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="collapse navbar-collapse d-flex">
          <ul class="navbar">
            <a class="navbar-item" href="/">
              Home
            </a>
            <Link to={`${url}`}>/ {deck.name} </Link>
          </ul>
        </div>
      </nav>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link class="btn btn-secondary" to={`${url}/edit`}>
          Edit
        </Link>
        <Link class="btn btn-primary" to={`${url}/study`}>
          Study
        </Link>
        <Link class="btn btn-primary" to={`${url}/cards/new`}>
          Add Cards
        </Link>
        <button class="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        <h2>Cards</h2>
        {card}
      </div>
    </div>
  );
}

export default Deck;
