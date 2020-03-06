class SwapiService {
  _apiBase = "https://swapi.co/api";

  getResource(responseURL) {
    return fetch(responseURL)
      .then(res => {
        if (!res.ok)
          throw new Error(
            `Could not fetch ${responseURL}, received ${res.status}`
          );
        return res.json();
      })
      .catch(error => console.error("Could not fetch", error));
  }
  getAllObjects(type) {
    return this.getResource(`${this._apiBase}/${type}/`).then(
      item => item.results
    );
  }
  getObject(type, id) {
    if (type === "planets") {
      const planet = this.getResource(`${this._apiBase}/${type}/${id}/`);
      return this._transformPlanet(planet);
    }
    return this.getResource(`${this._apiBase}/${type}/${id}/`);
  }

  _transformPlanet(planet) {
    return planet.then(planet => {
      const idRegExp = "/([0-9]*)/$";
      const id = planet.url.match(idRegExp)[1];
      return {
         id,
        planetName: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
      };
    });
  }
}

export default SwapiService;

/* const swapi = new SwapiService();

swapi
  .getAllObjects("planets")
  .then(items => items.forEach(item => console.log(item.name)));
swapi.getObject("planets", 3).then(item => console.log(item.name));
 */
