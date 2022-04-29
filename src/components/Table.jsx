import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    getPlanets,
    loading,
    search,
    setSearch,
    filter,
    setFilter,
    setFilteredValues,
    filteredValues,
    filterFunc,
    arrayFilter,
    setPlanets,
    setFiltro } = useContext(PlanetsContext);
  useEffect(() => {
    getPlanets().then((result) => {
      setPlanets(result);
      setFiltro(result);
    });
    // console.log(filteredValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header>
        <input
          type="text"
          data-testid="name-filter"
          name="search"
          onChange={ (e) => setSearch(
            { ...search, filterByName: { name: e.target.value } },
          ) }
          value={ search.filterByName.name }
        />
        <label htmlFor="column-filter">
          Coluna:
          <select
            value={ filter.column }
            onChange={ (e) => setFilter(
              { ...filter, column: e.target.value },
            ) }
            data-testid="column-filter"
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            data-testid="comparison-filter"
            value={ filter.comparison }
            onChange={ (e) => setFilter(
              { ...filter, comparison: e.target.value },
            ) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            value={ filter.value }
            type="number"
            data-testid="value-filter"
            onChange={ (e) => setFilter(
              { ...filter, value: e.target.value },
            ) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setFilteredValues([...filteredValues, filter]);
            filterFunc();
          } }
        >
          Filtrar
        </button>
      </header>
      <br />
      <br />
      {loading
        ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>
                  Rotation
                  <br />
                  Period
                </th>
                <th>
                  Orbital
                  <br />
                  Period
                </th>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Gravity</th>
                <th>Terrain</th>
                <th>Surface Water</th>
                <th>Population</th>
                <th>Films</th>
                <th>Created</th>
                <th>Edited</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              { arrayFilter
                .filter((planet) => (planet.name.includes(search.filterByName.name)))
                .map((planeta) => (
                  <tr key={ planeta.name }>
                    <td>{ planeta.name }</td>
                    <td>{ planeta.rotation_period }</td>
                    <td>{ planeta.orbital_period }</td>
                    <td>{ planeta.diameter}</td>
                    <td>{ planeta.climate}</td>
                    <td>{ planeta.gravity }</td>
                    <td>{ planeta.terrain }</td>
                    <td>{ planeta.surface_water }</td>
                    <td>{ planeta.population }</td>
                    <td>{ planeta.films }</td>
                    <td>{ planeta.created }</td>
                    <td>{ planeta.edited }</td>
                    <td>{ planeta.url }</td>
                  </tr>

                ))}
            </tbody>
            {console.log(arrayFilter)}
          </table>
        )
        : 'Carregando...'}
    </div>

  );
}

export default Table;
