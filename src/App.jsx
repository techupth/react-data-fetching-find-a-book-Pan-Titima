import "./App.css";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

function App() {
  //const [searchText, setSearchText] = useState("");
  const [results, setResult] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };



  const findBook = async (queryParameter) => {
    if(queryParameter.length == 0){
      queryParameter = null;
    }
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queryParameter}`);
    setResult(result.data.items);  
  }

  const optimizedFn = useCallback(debounce(findBook), []);

  return (
  <div className="App">
    <h2>Find a Book</h2>
    <div><input type="text" onChange={(e) => optimizedFn(e.target.value)}></input></div>
    {results.length > 0 && (
        <>
          {results.map((result, index) => (
            <div key={index} className="autocompleteItems">
              <li className="search-result">{result.volumeInfo.title}</li>
            </div>
          ))}
        </>
      )}
  </div>);
}

export default App;
