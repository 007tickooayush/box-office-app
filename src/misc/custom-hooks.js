import { useReducer, useEffect, useState, useRef,useCallback } from 'react';
import { apiGet } from './config';

function usePersistedReducer(reducer, intialState, key) {
  // achieve synchronization with local storage(browser)
  const [state, dispatch] = useReducer(reducer, intialState, inital => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : inital;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  // using useCallBack to control the onInputChange function
  const setPersistedInput = useCallback( newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  },[key]);
  // key is STATIC
  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

// a completely different hook to extract the logic in Show component for enhancing reusability
export function useShow(showId){
  const [state, dispatch] = useReducer(
    reducer,
    {
      show: null,
      isLoading: true,
      error: null,
    }
  );
    
  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          // using dispatch function instead of multiple state updates
          dispatch({ type: 'FETCH_SUCCESS', show: results });

          //   setShow(results);
          //   setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          // using dispatch functoin to update error
          dispatch({ type: 'FETCH_FAILED', error: err.message });

          //   setError(err.message);
          //   setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}

export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}