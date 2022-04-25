import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, getPlanets, loading, search, setSearch } = useContext(PlanetsContext);
  useEffect(() => {
    getPlanets();
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
      </header>
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
              { planets
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
          </table>
        )
        : 'Carregando...'}
    </div>

  );
}

export default Table;
