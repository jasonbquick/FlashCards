import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function DeckEdit() {
  const [deck, setDeck] = useState({ deckId: 1 });
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const { deckId } = useParams();
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescChange = (event) => setDesc(event.target.value);
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);
  const handleSubmit = () => {
    const newDeck = { id: deckId, name: name, description: desc };
    updateDeck(newDeck);
  };
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="collapse navbar-collapse d-flex">
          <ul class="navbar">
            <a class="navbar-item" href="/">
              Home
            </a>
            <Link to={`/decks/${deckId}`}>/ {deck.name} </Link>
            <a> / Edit Deck</a>
          </ul>
        </div>
      </nav>
      <div>
        <h1>Edit Deck</h1>
        <h6>Name</h6>
        <textarea
          placeholder={`${deck.name}`}
          onChange={handleNameChange}
        ></textarea>
        <h6>Description</h6>
        <textarea
          placeholder={`${deck.description}`}
          onChange={handleDescChange}
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

export default DeckEdit;
