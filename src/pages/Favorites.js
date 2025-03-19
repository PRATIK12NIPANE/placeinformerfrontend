import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Favorites = () => {





    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const removeFavorite = (title) => {
        const updatedFavorites = favorites.filter((fav) => fav !== title);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="container-fluid vh-100 bg-light p-4">
            <div className="container mt-3">
                <h1 className="text-primary">Your Favorite Places</h1>
                {favorites.length > 0 ? (
                    <ul className="list-group mt-3">
                        {favorites.map((title, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <span 
                                    className="text-primary" 
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/place/${encodeURIComponent(title)}`)}
                                >
                                    {title}
                                </span>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFavorite(title)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted mt-3">No favorite places added yet.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
