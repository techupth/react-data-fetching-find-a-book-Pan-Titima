import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResult] = useState([]);

  useEffect (() => {
    if(searchText){
      findBook(searchText);
  }
  }, [searchText]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  }

  const findBook = async (queryParameter) => {
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queryParameter}`);
    setResult(result.data.items);  
  }

  return (
  <div className="App">
    <h2>Find a Book</h2>
    <div><input type="text" onChange={handleSearch}></input></div>
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
