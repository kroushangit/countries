import "../assets/CountryShimmer.css"

const CountryListShimmer = () => {
    const fillArray = Array.from({length:10});
    return (
        <div className="countries-container">
            {fillArray.map((el, idx)=> <div key={idx} className="country-card shimmercard"></div>)}
        </div>
    )
}

export default CountryListShimmer;
