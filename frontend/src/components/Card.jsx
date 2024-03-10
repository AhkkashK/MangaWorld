import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../css/Card.css";
import star from "./../images/star.png";

export default function Card({ id }) {
  const [results, setResults] = useState([]);
  const URL = `http://localhost:3000/api/manga/${id}`;

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

 

  return (
    <div className="card-container">
      <img className="card-image" src={results.image_url} alt="" />
      <a href={`/manga?id=${id}`}>
        <div className="card-overlay">
          <div className="card-score">
            <img src={star} alt="" />
            <small>{results.score}</small>
          </div>
          <h3>{results.title}</h3>
        </div>
      </a>
    </div>
  );
}
