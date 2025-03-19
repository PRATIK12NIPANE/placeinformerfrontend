import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Destinations = () => {



  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopPlaces();
  }, []);

  // Debounced API call to prevent excessive requests
  const fetchSuggestions = useCallback(
    async (input) => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }
  
      setLoading(true);
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${input} India tourism OR city OR state OR district OR landmark OR river OR beach OR mountain OR temple OR heritage`
        );
        const data = await res.json();
        const results = data.query.search
          .map((item) => item.title.replace(/\s*\(.*?\)\s*/g, ""))
          .filter((title) =>
            [
              "city",
              "state",
              "district",
              "landmark",
              "river",
              "beach",
              "mountain",
              "temple",
              "fort",
              "heritage",
              "tourist",
              "national park",
              "wildlife sanctuary"
            ].some((keyword) => title.toLowerCase().includes(keyword))
          );
  
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  

  const fetchTopPlaces = async () => {
    const topPlaces = [
      "Taj Mahal",
      "Jaipur",
      "Goa",
      "Ajinkyatara",
      "Andaman and Nicobar Islands",
      "Udaipur",
      "Rishikesh",
      "Hampi",
      "Kodaikanal",
      "Darjeeling",
    ];
    fetchPlaces(topPlaces);
  };

  const fetchPlaces = async (titles) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages&exintro&explaintext&pithumbsize=400&titles=${titles.join(
          "|"
        )}`
      );
      const data = await res.json();
      const pages = data.query.pages;

      const placesData = Object.values(pages).map((page) => ({
        title: page.title.replace(/\s*\(.*?\)\s*/g, ""),
        description: page.extract ? page.extract.split(". ")[0] + "." : "No description available.",
        image: page.thumbnail ? page.thumbnail.source : "https://via.placeholder.com/400",
      }));

      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleSearch = () => {
    if (query) {
      fetchPlaces([query]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place);
    setSuggestions([]);
    fetchPlaces([place]);
    navigate(`/place/${encodeURIComponent(place)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelect(suggestions[selectedIndex]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Hidden Gems Traveler</h2>

      <div className="position-relative">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search India's hidden travel gems..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Show Suggestions */}
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 bg-white shadow mt-1" style={{ zIndex: 10 }}>
            {suggestions.map((place, index) => (
              <li
                key={index}
                className={`list-group-item list-group-item-action ${index === selectedIndex ? "active" : ""}`}
                onClick={() => handleSelect(place)}
                style={{ cursor: "pointer" }}
              >
                {place}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Show Travel Places */}
      <div className="row mt-4">
        {places.map((place, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="card h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/place/${encodeURIComponent(place.title)}`)}
            >
              <img src={place.image} className="card-img-top" alt={place.title} />
              <div className="card-body">
                <h5 className="card-title">{place.title}</h5>
                <p className="card-text">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
