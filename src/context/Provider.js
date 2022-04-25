import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
  });

  const getPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    console.log(results);
    setPlanets(results);
    console.log(planets);
    setLoading(true);
  };

  const contextValue = {
    planets,
    getPlanets,
    loading,
    setSearch,
    search,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
