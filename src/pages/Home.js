import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

function Home() {
  const [input, setInput] = useState('');

  const onInputChange = ev => {
    setInput(ev.target.value);
    // console.log(ev.target.value);
  };

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => console.log(result));
  };

  const onKeyDown = (ev) =>{
    // ** map the keycode to get results with enter key as well **
    if(ev.keyCode === 13){
      onSearch()
    }
    // console.log(ev.keyCode);

  };

  return (
    <MainPageLayout>
      {/* associated the input State with input field by using `value = {input}` */}
      <input onChange={onInputChange} value={input} onKeyDown={onKeyDown}/>
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
}

export default Home;
