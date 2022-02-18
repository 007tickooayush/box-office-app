/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import {useShow} from '../misc/custom-hooks';


const Show = () => {
  // destructuring and fetching only the 'id' param
  const { id } = useParams();

  // using custom hook to load data
  const { show,isLoading,error } = useShow(id);

  //   const [show, setShow] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState('');

  // console.log('params',params);


  // log the show details json Obj
  // console.log('show', show);

  if (isLoading) {
    return <div> Data is being loaded</div>;
  }

  if (error) {
    return <div> Error occured: {error} </div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast}/>
      </InfoBlock>
    </ShowPageWrapper>
  );
}

export default Show;
