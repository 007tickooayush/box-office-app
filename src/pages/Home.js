import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value);
    // console.log(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResults(result);
      // console.log(result);
    });
  };

  const onKeyDown = ev => {
    // ** map the keycode to get results with enter key as well **
    if (ev.keyCode === 13) {
      onSearch();
    }
    // console.log(ev.keyCode);
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div> NO RESULTS</div>;
    }
    if (results && results.length !== 0) {
      return (
        <div>
          {results.map((item) => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      {/* associated the input State with input field by using `value = {input}` */}
      <input onChange={onInputChange} value={input} onKeyDown={onKeyDown} />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
