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
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [filteredValues, setFilteredValues] = useState([]);

  const [arrayFilter, setFiltro] = useState([]);

  const getPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    setLoading(true);
    return results;
  };

  const filterFunc = () => {
    const filtro = planets.filter((planet) => {
      if (filter.comparison === 'maior que') {
        return Number(planet[filter.column]) > Number(filter.value);
      }
      if (filter.comparison === 'menor que') {
        return Number(planet[filter.column]) < Number(filter.value);
      }
      if (filter.comparison === 'igual a') {
        return Number(planet[filter.column]) === Number(filter.value);
      }
      return planet;
    });
    setFiltro(filtro);
  };

  const contextValue = {
    planets,
    getPlanets,
    loading,
    setSearch,
    search,
    filter,
    setFilter,
    filteredValues,
    setFilteredValues,
    filterFunc,
    arrayFilter,
    setFiltro,
    setPlanets,
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
