import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

// defining results outside the component
const renderResults = results => {
  if (results && results.length === 0) {
    return <div> NO RESULTS</div>;
  }
  if (results && results.length !== 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery(); // custom hook to update the page but not the input field
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
      // console.log(ev.target.value);
    },
    [setInput]
  );

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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

  // using  to see the reason of rerender
  // useWhyDidYouUpdate('home',{onInputChange,onKeyDown});

  // using a react hook to render the function only once since memo can not preven it from rerenderring
  // (REASON: objects in js are compared by reference not by value)
  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
    // console.log(ev.target.value);
  }, []);

  return (
    <MainPageLayout>
      {/* associated the input State with input field by using `value = {input}` */}
      <SearchInput
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
        placeholder="Search for something"
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
