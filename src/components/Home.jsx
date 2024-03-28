import { useState } from "react";
import SelectMenu from "./SelectMenu";
import SearchBar from "./SearchBar"
import CountriesList from "./CountriesList";
import { useTheme } from "../hooks/useTheme";

const Home = () => {
  const [isDark] = useTheme();
    const [query, setQuery] = useState('');
  return (
    <main className={`${isDark?'dark':''}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      <CountriesList query={query} />
    </main>
  );
};

export default Home;
