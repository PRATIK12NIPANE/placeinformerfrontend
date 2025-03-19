import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={place.image} />
      <Card.Body>
        <Card.Title>{place.name}</Card.Title>
        <Card.Text>{place.description.substring(0, 100)}...</Card.Text>
        <Link to={`/place/${place.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PlaceCard;
