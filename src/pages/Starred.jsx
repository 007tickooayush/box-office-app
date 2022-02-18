import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
      .then(apiData => apiData.map(show => ({show}))) // putting the API data into the show state present in ShowGrid.jsx component
      .then(results => {
        // logging resultant
        console.log(results);

        setShows(results);
        setIsLoading(false);

      }).catch((err) =>{
        setError(err.message);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    return () => {};
  }, [starred]);



  return <MainPageLayout>
    {isLoading && <div>Show(s) are still Loading</div>}
    {error && <div>Error occured: {error}</div>}
    {!isLoading && !shows && <div>No shows were added</div>}
    {!isLoading && !error && shows && <ShowGrid data={shows} />}
  </MainPageLayout>;
};

export default Starred;
