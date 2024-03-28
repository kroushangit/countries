import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";

const CountriesList = ({ query }) => {
  const [countryList, setCountryList] = useState([]);
  useEffect(()=> {
    fetch('https://restcountries.com/v3.1/all').then((res)=> res.json()).then((data)=>{
      setCountryList(data);
    })
  },[])
  const arr = countryList.filter((cty) =>
    cty.name.common.toLowerCase().includes(query) || cty.region.toLowerCase().includes(query)
  );
  return (
    <>
      {!countryList.length? <CountryListShimmer />: <div className="countries-container">
        {arr.map((country, idx) => {
          return <CountryCard key={idx} country={country} />;
        })}
      </div>}
    </>
  );
};

export default CountriesList;
