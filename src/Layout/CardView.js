import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function CardView({ cards }) {
  const history = useHistory();
  const [flip, setFlip] = useState(true);
  const [cardID, setCardID] = useState(0);
  const [flipCount, setFlipCount] = useState(0);
  const param = useParams();
  const deckId = param.deckId;
  const length = cards.length;
  const cardCount = cardID + 1;
  function handleFlip() {
    setFlip(!flip);
    setFlipCount((previous) => previous + 1);
  }
  function handleNext() {
    setCardID((previous) => previous + 1);
    if (cardCount >= length) {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page"
        )
      ) {
        window.location.reload();
      } else {
        history.push("/");
      }
    }
  }
  if (length > 2) {
    return (
      <div>
        <div class="container border">
          <div>
            <div>
              <h3>
                Card {cardCount} of {length}
              </h3>
              <p>{flip ? cards[cardID].front : cards[cardID].back}</p>
              <button class="btn btn-primary p-2" onClick={handleFlip}>
                Flip
              </button>
              {flipCount > 0 ? (
                <button class="btn btn-primary p-2" onClick={handleNext}>
                  Next
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {length} cards in this
          deck.
        </p>
        <a href={`/decks/${deckId}/cards/new`} class="btn btn-primary">
          Add Card
        </a>
      </div>
    );
  }
}

export default CardView;
