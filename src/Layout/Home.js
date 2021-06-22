import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { listDecks } from "../utils/api/index.js";

function Home() {

const [decks, setDecks] = useState([{}]);
const [count, setCount] = useState(0) 
// const abortController = new AbortController();

// useEffect(() => {
//   async function loadDeck() {
//       try{
//         const signal = abortController.signal()
//     const response = await listDecks(signal);
//     setDecks(response);
//     setCount((previous) => previous + 1)
//       }
//   } catch (error) {
//       console.log(error)
//   }
//   loadDeck();
// }, []);

useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
        try {
          const signal = abortController.signal
            const response = await listDecks(signal)
            setDecks(response);
            setCount((previous) => previous + 1)
        } catch (error) {
            console.log(error)
        }
    }
    loadDeck();
}, [])
console.log(decks)

if(count > 0){
    return (<div>
        {decks.map((deck) => <DeckList deck={deck} />)}
    </div>)
}
return 'Loading..'
}

export default Home;
