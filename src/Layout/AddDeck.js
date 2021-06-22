import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function AddDeck() {
  const history = useHistory();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescChange = (event) => setDesc(event.target.value);

  const handleSubmit = () => {
    const newDeck = { name: name, description: desc };
    createDeck(newDeck).then((response) => {
      console.log(response);
      console.log(response.id);
      history.push(`/decks/${response.id}`);
    });
  };
  console.log(document.querySelectorAll("input"))
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="collapse navbar-collapse d-flex">
          <ul class="navbar">
            <a class="navbar-item" href="/">
              Home
            </a>
            <a> / Create Deck</a>
          </ul>
        </div>
      </nav>
      <h1>Create Deck</h1>
      <div>
        <h4>Name</h4>
        <input type="text" placeholder="Deck Name" onChange={handleNameChange} />
        <h4>Description</h4>
        <textarea
          placeholder="Brief description of the deck"
          onChange={handleDescChange}
        ></textarea>
      </div>
      <button class="btn btn-secondary" onClick={() => history.push("/")}>
        Cancel
      </button>
      <button class="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default AddDeck;
