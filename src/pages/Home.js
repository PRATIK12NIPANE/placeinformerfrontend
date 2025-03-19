import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Compass } from "lucide-react";
import "../styles/Home.css";

const images = [
  "/images/img8.png",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img6.jpg",
];

const reviews = [
  { name: "Rahul", image: "/images/person1.jpeg", review: "Absolutely amazing! 🌟" },
  { name: "Priya", image: "/images/person2.png", review: "Hidden gems made easy!" },
  { name: "Aniket", image: "/images/person3.jpeg", review: "Best travel guide ever!" },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <div className="hero-section" style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="overlay">
          <h1>Explore Hidden Gems 🌍</h1>
          <p>Discover breathtaking places you've never seen before.</p>
          <Link to="/destinations" className="explore-btn">Start Exploring</Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us? 🌍</h2>
        <div className="feature-grid">
          {[{ icon: <MapPin size={50} color="#FFA500" />, title: "Discover Unique Destinations", desc: "Explore breathtaking hidden gems around the world." },
          { icon: <Star size={50} color="#FFD700" />, title: "Personalized Travel Plans", desc: "Get tailor-made recommendations just for you." },
          { icon: <Compass size={50} color="#32CD32" />, title: "Interactive Maps & Guides", desc: "Navigate easily with our smart travel tools." }]
            .map((feature, index) => (
              <div key={index} className="feature-box">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Traveler Reviews */}
      <section className="reviews py-12 bg-blue-100 text-center">
        <h2>Traveler Reviews</h2>
        <div className="review-grid flex justify-center gap-6 flex-wrap">
          {reviews.map((review, index) => (
            <div key={index} className="review-box bg-white p-6 rounded-lg shadow-lg w-72 text-center transition-transform transform hover:scale-105">
              <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <p className="text-lg italic">"{review.review}"</p>
              <h4 className="text-base font-semibold mt-3">- {review.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faqs">
        <h2 className="faq-title">Frequently Asked Questions ❓</h2>
        <div className="faq-box">
          {[
            {
              question: "Is this service free?",
              answer: "Yes! Our platform is completely free to use. You can explore all available destinations without any charges. However, some advanced features may require a subscription in the future."
            },
            {
              question: "Can I save my favorite places?",
              answer: "Absolutely! By creating an account, you can bookmark your favorite locations and revisit them anytime. This feature allows you to keep track of the best spots and plan future visits easily."
            },
            {
              question: "Do I need to create an account?",
              answer: "No, you can explore the platform without an account. However, signing up unlocks personalized recommendations, the ability to save favorite locations, and access to exclusive travel insights tailored just for you."
            },
            {
              question: "Is my data secure?",
              answer: "Yes! We take data privacy seriously and follow industry-leading security protocols to protect your personal information. Your data is encrypted, and we do not share it with third parties without your consent."
            },
            {
              question: "Can I share locations with friends?",
              answer: "Of course! You can easily share any destination with your friends via social media, email, or direct links. This makes it simple to plan group trips or recommend great places to others."
            }
          ].map((faq, index) => (
            <details key={index} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Home;
