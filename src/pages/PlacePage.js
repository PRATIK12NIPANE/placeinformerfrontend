import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PlacePage = () => {


 
    const navigate = useNavigate();
  



  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

  const [place, setPlace] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [hiddenGems, setHiddenGems] = useState([]);
  const [reviews, setReviews] = useState([
    { id: 1, user: "Amit", comment: "Beautiful place with amazing history!" },
    {
      id: 2,
      user: "Priya",
      comment: "A must-visit destination for nature lovers.",
    },
  ]);
  const [newReview, setNewReview] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch Wikipedia Details
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            decodedTitle
          )}`
        );
        const data = await res.json();
        setPlace(data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };
    fetchPlaceDetails();
  }, [decodedTitle]);

  // Fetch Wikipedia Images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=original&titles=${encodeURIComponent(
            decodedTitle
          )}`
        );
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        setImages([pages[pageId]?.original?.source || ""]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [decodedTitle]);

  // Fetch Hidden Gems
  useEffect(() => {
    const fetchHiddenGems = async () => {
        try {
            const res = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(decodedTitle)} tourist attractions`
            );
            const data = await res.json();

            const pages = data?.query?.search || [];

            const gemData = await Promise.all(
                pages.map(async (gem) => {
                    try {
                        const detailsRes = await fetch(
                            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(gem.title)}&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=200&exintro&explaintext`
                        );
                        const detailsData = await detailsRes.json();
                        const pageId = Object.keys(detailsData.query.pages)[0];
                        const page = detailsData.query.pages[pageId];

                        return {
                            title: gem.title,
                            image: page?.thumbnail?.source || "https://via.placeholder.com/80",
                            description: page?.extract?.split(".")[0] + "." || "No description available.",
                        };
                    } catch (error) {
                        console.error("Error fetching details for:", gem.title, error);
                        return { title: gem.title, image: "https://via.placeholder.com/80", description: "No description available." };
                    }
                })
            );

            setHiddenGems(gemData);
        } catch (error) {
            console.error("Error fetching hidden gems:", error);
        }
    };

    fetchHiddenGems();
}, [decodedTitle]);

        

  // Fetch YouTube Videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${decodedTitle} travel&type=video&key=AIzaSyA5FiMCWMpmgGJDUDUdJHiNe4uqwQIIEHU`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [decodedTitle]);

  // Handle Review Submission
  const handleAddReview = () => {
    if (newReview.trim() !== "") {
      setReviews([
        ...reviews,
        { id: reviews.length + 1, user: "Guest", comment: newReview },
      ]);
      setNewReview("");
    }
  };

  // Handle Favorite Toggle
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(decodedTitle));
  }, [decodedTitle]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav !== decodedTitle);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(decodedTitle);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!place) return <p className="text-center text-muted">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center text-primary">{place.title}</h1>

        {/* Favorite Button */}
        <button
          className="border-0 bg-transparent p-0"
          onClick={toggleFavorite}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
          }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <i
            className={`fa${isFavorite ? "s" : "r"} fa-heart text-danger`}
            style={{ fontSize: "1.5rem" }}
          ></i>
        </button>

        {/* Wikipedia Image */}
        {images[0] && (
          <div className="text-center">
            <img
              src={images[0]}
              alt={place.title}
              className="img-fluid rounded shadow-lg my-3"
              style={{ maxHeight: "400px", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        )}

        {/* Description */}
        <p className="mt-4 lead">{place.extract}</p>

        {/* Videos */}
        <h2 className="mt-5 text-secondary">Travel Videos</h2>
        <div className="row mt-3">
          {videos.length > 0 ? (
            videos.slice(0, 4).map((video) =>
              video.id?.videoId ? (
                <div className="col-md-6 mb-3" key={video.id.videoId}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title="Travel Video"
                    className="w-100 rounded shadow"
                    style={{ height: "250px" }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              ) : null
            )
          ) : (
            <p className="text-center text-muted">No videos found.</p>
          )}
        </div>

        {/* Hidden Gems */}
        {/* Hidden Gems */}
<h2 className="mt-5 text-secondary">Hidden Gems</h2>
<ul className="list-group mt-3">
    {hiddenGems.length > 0 ? (
        hiddenGems.slice(0, 5).map((gem) => (
            <li
                key={gem.title}
                className="list-group-item list-group-item-action d-flex align-items-center"
                onClick={() => navigate(`/place/${encodeURIComponent(gem.title)}`)}
                style={{ cursor: "pointer" }}
            >
                <img
                    src={gem.image}
                    alt={gem.title}
                    className="me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                />
                <div>
                    <h5 className="mb-1">{gem.title}</h5>
                    <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>{gem.description}</p>
                </div>
            </li>
        ))
    ) : (
        <p className="text-center text-muted">No hidden gems found.</p>
    )}
</ul>



        {/* Reviews */}
        <h2 className="mt-5 text-secondary">Traveler Reviews</h2>
        <div className="mt-3">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded p-3 mb-3 bg-light">
              <strong className="text-dark">{review.user}</strong>
              <p className="text-muted">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="mt-4">
          <h4>Add Your Review</h4>
          <textarea
            className="form-control mb-2"
            rows="3"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
          ></textarea>
          <button className="btn btn-primary" onClick={handleAddReview}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
