import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardView from "./CardView";

function DeckView() {
  const [deck, setDeck] = useState({ cards: [], deckId: 1 });
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
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
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="collapse navbar-collapse d-flex">
          <ul class="navbar">
            <a class="navbar-brand" href="/">
              Home
            </a>
            <Link to={`/decks/${deckId}`}>/ {deck.name} </Link>
            <a class="nav-link disabled"> / Study</a>
          </ul>
        </div>
      </nav>
      <h1>{deck.name}: Study</h1>
      <CardView cards={cards} />
    </div>
  );
}

export default DeckView;
