import { Link } from "react-router-dom";

const CountryCard = (props) => {
  const data = {
    name: props?.country?.name?.common,
    flagUrl: props?.country?.flags?.svg,
    population: props?.country?.population,
    region: props?.country?.region,
    capital: props?.country?.capital,
  };
  return (
    <Link to={`/${data.name}`} className="country-card">
      <img src={data.flagUrl} alt={`${data.name} flag`} />
      <div className="card-text">
        <h3 className="card-title">{data.name}</h3>
        <p>
          <b>Population: </b>
          {data.population.toLocaleString('en-In')}
        </p>
        <p>
          <b>Region: </b>
          {data.region}
        </p>
        <p>
          <b>Capital: </b>
          {data.capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;
