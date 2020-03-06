import React from "react";
import SwapiService from "../../services/swapi-service";

import "./random-planet.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class RandomPlanet extends React.Component {
  state = {
    planet: {
      id: null,
      planetName: null,
      population: null,
      rotationPeriod: null,
      diameter: null
    },
    isLoading: true,
    isError: false
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onError = () => {
    this.setState({
      isError: true,
      isLoading: false
    });
  };

  updatePlanet = () => {
    const swapiService = new SwapiService();
    swapiService
      .getObject("planets", 15)
      .then(planet => this.setState({ planet, isLoading: false }))
      .catch(this.onError);
  };

  loadingPlanet = (planet, isLoading, isError) => {
    if (isLoading) return <Spinner />;
    else if (isError) return <ErrorIndicator />;
    else return <PlanetView planet={planet}/>;
  };

  render() {
    const { planet, isLoading, isError } = this.state;
    return (
      <div className="random-planet jumbotron rounded">
        {this.loadingPlanet(planet, isLoading, isError)}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, planetName, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{planetName}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default RandomPlanet;
