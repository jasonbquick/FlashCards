import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api/index.js";

function CardList({ cards }) {
  const { url } = useRouteMatch();
  function handleDelete() {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      const cardId = cards.id;
      deleteCard(cardId);
      window.location.reload();
    }
  }
  return (
    <div>
      <div>
        <div class="container border">
          <div class="row">
            <div class="col">{cards.front}</div>
            <div class="col">
              {cards.back}
              <div class="row">
                <Link
                  class="btn btn-secondary"
                  to={`${url}/cards/${cards.id}/edit`}
                >
                  Edit
                </Link>
                <button class="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardList;
