import { useState, useEffect } from "react";
import { motion, AnimatePresence,useAnimation } from "framer-motion";
import "../styles/Home.css";
import { useInView } from "react-intersection-observer";
import "bootstrap/dist/css/bootstrap.min.css";
import { StarFill, ChevronLeft, ChevronRight } from "react-bootstrap-icons";


const images = [
  {
    src: "/images/beach.jpg",
    title: "Explore Breathtaking Beaches",
    subtitle: "Feel the ocean breeze and the soft sand under your feet.",
  },
  {
    src: "/images/mountains.jpg",
    title: "Adventure in the Mountains",
    subtitle: "Hike through stunning landscapes and breathe in the fresh air.",
  },
  {
    src: "/images/city.jpg",
    title: "Discover Vibrant Cities",
    subtitle: "Experience culture, nightlife, and endless excitement.",
  },
  {
    src: "/images/forest.jpg",
    title: "Relax in the Wilderness",
    subtitle: "Find peace and serenity among lush greenery.",
  },
];


const gems = [
  { id: 1, name: "Bali, Indonesia", image: "/images/gem1.jpg", description: "A tropical paradise with stunning beaches." },
  { id: 2, name: "Santorini, Greece", image: "/images/gem2.jpg", description: "Whitewashed buildings and blue-domed churches." },
  { id: 3, name: "Kyoto, Japan", image: "/images/gem3.jpg", description: "Ancient temples and cherry blossoms." },
];

 

const Home = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () =>
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  const goToSlide = (slideIndex) => setIndex(slideIndex);

  useEffect(() => {
    const interval = setInterval(nextSlide, 15000); // 15 seconds
    return () => clearInterval(interval);
  }, [index]); // Ensuring interval restarts on each index change



  const controls = useAnimation();
  const {  inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 30 });
    }
  }, [inView, controls]);




  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 5, comment: "Absolutely stunning place!" },
    { name: "John", rating: 4, comment: "Loved the vibe and history." },
    { name: "Emma", rating: 5, comment: "Hidden gem! A must-visit." },
    { name: "Liam", rating: 3, comment: "Nice but could be better." },
    { name: "Sophia", rating: 4, comment: "A peaceful place to relax." },
    { name: "Noah", rating: 5, comment: "Amazing experience!" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextReview = () => {
    if (currentIndex + reviewsPerPage < reviews.length) {
      setCurrentIndex((prev) => prev + reviewsPerPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - reviewsPerPage);
    }
  };

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const addReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  return (
    <>
    
      <div className="slider-container">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={images[index].src}
            className="image-slide"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={images[index].src}
              alt="Travel Destination"
              className="slider-image"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        <div className="overlay">
          <motion.h1
            key={images[index].title}
            className="title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {images[index].title}
          </motion.h1>
          <motion.p
            key={images[index].subtitle}
            className="subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2 }}
          >
            {images[index].subtitle}
          </motion.p>
        </div>

        <div className="progress-bar">
          <motion.div
            key={index}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>

        <div className="nav-buttons">
          <button onClick={prevSlide} className="prev-btn">
            ❮
          </button>
          <button onClick={nextSlide} className="next-btn">
            ❯
          </button>
        </div>

        {/* Image dots (indicators) */}
        <div className="dots-container">
          {images.map((_, i) => (
            <button
              key={i}
              className={`dot ${index === i ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>

     <section className="hidden-gems-section">
      <h1 className="section-title">Hidden Travel Gems</h1>
      <p className="section-description">Discover breathtaking travel destinations around the world.</p>

      <div className="gems-grid">
        {gems.map((gem) => (
          <div key={gem.id} className="gem-item">
            <img src={gem.image} alt={gem.name} className="gem-image" />
            <div className="gem-overlay">
              <h3>{gem.name}</h3>
              <p>{gem.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="explore-more-btn">Explore More</button>
    </section>


    <div className="user-reviews-container">
      <h2 className="user-reviews-title">User Reviews & Ratings</h2>

      <div className="reviews-wrapper">
        {currentIndex > 0 && (
          <button onClick={prevReview} className="button-prev">
            <ChevronLeft />
          </button>
        )}

        <div className="review-cards">
          {reviews.slice(currentIndex, currentIndex + reviewsPerPage).map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-name">{review.name}</p>
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarFill key={i} className={`me-1 ${i < review.rating ? "text-warning" : "text-secondary"}`} />
                ))}
              </div>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </div>

        {currentIndex + reviewsPerPage < reviews.length && (
          <button onClick={nextReview} className="button-next">
            <ChevronRight />
          </button>
        )}
      </div>

      <div className="add-review-form">
        <h3>Add Your Review</h3>
        <form onSubmit={addReview}>
          <input type="text" name="name" placeholder="Your Name" value={newReview.name} onChange={handleInputChange} required />
          <select name="rating" value={newReview.rating} onChange={handleInputChange}>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>{star} Stars</option>
            ))}
          </select>
          <textarea name="comment" placeholder="Your Review" value={newReview.comment} onChange={handleInputChange} required />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
    
    </>
  );
};

export default Home;
