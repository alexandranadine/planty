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

  const editPlant = (updatedPlant) => {
    setPlants((prev) =>
      prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
  };

  const deletePlant = (id) => {
    setPlants((prev) => prev.filter((p) => p.id !== id));
  };

  const editWishlistItem = (updatedItem) => {
    setWishlist((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-3/4 bg-white p-4 rounded shadow">
        <Navbar />
        <AddPlantForm onAdd={addPlant} />
        <WateringList
          plants={plants}
          onWater={markWatered}
          onEdit={editPlant}
          onDelete={deletePlant}
        />
        <Wishlist
          list={wishlist}
          onAdd={addToWishlist}
          onRemove={removeFromWishlist}
          onEdit={editWishlistItem}
        />
      </div>
    </div>
  );
}
