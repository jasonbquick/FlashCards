import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";

function AddCard() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "" });
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const { deckId } = useParams();
//   const {url} = useRouteMatch();
//   console.log(url)
//   const [max, setMax] = useState(0);
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      const cards = response.cards;
    //   cards.forEach((card) => {
    //     if (card.id > max) {
    //       setMax(card.id);
    //     }
    //   });
    }
    loadDeck();
  }, []);
  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);
  const handleSave = () => {
    const card = { front: front, back: back };
    createCard(deckId, card).then(() => {
      window.location.reload();
    });
  };
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="collapse navbar-collapse d-flex">
          <ul class="navbar">
            <a class="navbar-brand" href="/">
              Home
            </a>
            <Link to={`/decks/${deckId}`}>/ {deck.name} </Link>
            <a> / Add Card</a>
          </ul>
        </div>
      </nav>
      <div>
        <h4>Front</h4>
        <textarea
          placeholder="Front side of card"
          onChange={handleFrontChange}
        ></textarea>
        <h4>Back</h4>
        <textarea
          placeholder="Back side of card"
          onChange={handleBackChange}
        ></textarea>
        <div>
          <button class="btn btn-secondary" onClick={() => history.push("/")}>
            Done
          </button>
          <button class="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddCard;
