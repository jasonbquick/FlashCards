import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

function CardEdit() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ name: "loading..." });
  const [card, setCard] = useState({ front: "loading...", back: "loading..." });
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  const handleSubmit = () => {
    const newCard = { id: cardId, front: front, back: back };
    console.log(newCard);
    updateCard(newCard);
  };

  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId);
      setCard(response);
    }
    loadCard();
  }, [cardId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="collapse navbar-collapse d-flex">
          <ul class="navbar">
            <a class="navbar-item" href="/">
              Home
            </a>
            <Link to={`/decks/${deckId}`}>/ {deck.name} </Link>
            <a> / Edit Card {cardId}</a>
          </ul>
        </div>
      </nav>
      <div>
        <h1>Edit Card</h1>
        <h6>Front</h6>
        <textarea
          placeholder={card.front}
          onChange={handleFrontChange}
        ></textarea>
        <h6>Back</h6>
        <textarea
          placeholder={card.back}
          onChange={handleBackChange}
        ></textarea>
      </div>
      <div>
        <Link to={`/decks/${deckId}`} class="btn btn-secondary">
          Cancel
        </Link>
        <button class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CardEdit;
