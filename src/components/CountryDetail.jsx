import { useEffect, useState } from "react";
import "../assets/CountryDetail.css";
import { Link, useParams } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailShimmer";
import { useTheme } from "../hooks/useTheme";

const CountryDetail = () => {
  const [isDark] = useTheme();
  const url = useParams();
  const countryName = url.country;
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          flag: data.flags.svg,
          tld: Object.values(data.tld),
          currencies: Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(","),
          languages: Object.values(data.languages)
            .map((language) => language)
            .join(","),
          borders: [],
        });
        if(!data.borders){
          data.borders = [];
        }
        Promise.all( data.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => borderCountry.name.common);
        })).then((borders)=> {
          setCountryData((prevState => ({...prevState, borders: borders})))
        })
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country not Found</div>;
  }

  return countryData == null ? (
    <CountryDetailShimmer />
  ) : (
    <main className={`${isDark?'dark':''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.flag} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>Population: </b>
                <span className="population">
                  {countryData.population.toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <b>Region: </b>
                <span className="region">{countryData.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region">{countryData.subregion}</span>
              </p>
              <p>
                <b>Capital: </b>
                <span className="capital">{countryData.capital}</span>
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-level-domain">{countryData.tld}</span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies">{countryData.currencies}</span>
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages">{countryData.languages}</span>
              </p>
            </div>
            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;{countryData.borders.map((border, idx)=>{return<Link to={`/${border}`} key={idx}>{border}</Link>})}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetail;
