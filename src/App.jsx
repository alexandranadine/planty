import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import React-Calendar
// import "react-calendar/dist/Calendar.css"; // Import default styles
import Header from "./components/Header";
import WateringList from "./components/WateringList";
import Wishlist from "./components/Wishlist";
import AddPlantForm from "./components/AddPlantForm";
import EnvironmentCards from "./components/EnvironmentCards";
import "./index.css";

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

  // Calculate dates when plants need watering
  const getWateringDates = () => {
    const dates = [];
    plants.forEach((plant) => {
      const lastWatered = new Date(plant.lastWatered);
      const nextWaterDate = new Date(lastWatered);
      nextWaterDate.setDate(lastWatered.getDate() + plant.wateringFrequency);
      dates.push(nextWaterDate.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
    });
    return dates;
  };

  const wateringDates = getWateringDates();

  // Highlight watering dates on the calendar
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Format the date to YYYY-MM-DD for comparison
      const dateString = date.toISOString().slice(0, 10);
      if (wateringDates.includes(dateString)) {
        return "highlight"; // Use a custom class for highlighting
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-3/4 bg-white rounded shadow border">
        {/* Header: Full Width */}
        <Header />

        <div className="flex gap-4 p-4">
          {/* Left Column: AddPlantForm and Wishlist */}
          <div className="w-1/3 flex flex-col">
            <AddPlantForm onAdd={addPlant} />
            <Wishlist
              list={wishlist}
              onAdd={addToWishlist}
              onRemove={removeFromWishlist}
              onEdit={editWishlistItem}
            />
          </div>

          {/* Right Column: Other Components */}
          <div className="flex-1">
            <WateringList
              plants={plants}
              onWater={markWatered}
              onEdit={editPlant}
              onDelete={deletePlant}
            />
            <Calendar
              className="mt-4 w-full bg-white shadow p-4 rounded"
              tileClassName={tileClassName} // Apply custom styles to tiles
            />
            <EnvironmentCards />
          </div>
        </div>
      </div>
    </div>
  );
}
