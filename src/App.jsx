import "./index.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WateringList from "./components/WateringList";
import Wishlist from "./components/Wishlist";
import AddPlantForm from "./components/AddPlantForm";

export default function App() {
  // Read once from localStorage at initial render
  const [plants, setPlants] = useState(() => {
    const stored = localStorage.getItem("plants");
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addPlant = (plant) => {
    setPlants((prev) => [...prev, plant]);
  };

  const markWatered = (id) => {
    setPlants((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, lastWatered: new Date().toISOString().slice(0, 10) }
          : p
      )
    );
  };

  const addToWishlist = (item) => {
    setWishlist((prev) => [...prev, item]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <Navbar />
      <AddPlantForm onAdd={addPlant} />
      <WateringList plants={plants} onWater={markWatered} />
      <Wishlist
        list={wishlist}
        onAdd={addToWishlist}
        onRemove={removeFromWishlist}
      />
    </div>
  );
}
