//@ts-nocheck
// src/pages/Calendar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MovieModal from "@/components/MovieModal"; // Import the MovieModal component
import styles from "../Calendar.module.css"
import { useRouter } from "next/navigation";
import { useChapters } from "@/app/context/ChaptersContext";

const Calendar = () => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [finishedMovies, setFinishedMovies] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [loadingModal, setLoadingModal] = useState(false);
  // const [chapters, setChapters] = useState([]);
  const { chapters, setChapters } = useChapters();

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/getMovies"); // Use relative path
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        console.log("API Response:", data); // Check API response data
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Set loading to false once movies are fetched
      }
    };

    fetchMovies();
    console.log("Movies fetched successfully");
  }, []);

  const openDoor = (day) => {
    if (!loading && day <= new Date().getDate()) {
      setSelectedDoor(day);
      setMovieInfo(movies[day - 1]);
      console.log("Selected Movie:", movies[day - 1]); // Log to check if the correct movie is being set
    }
  };

  const handleAlreadySeen = () => {
    // Implement the logic for "Already Seen" if needed
    console.log("Already Seen clicked");
  };
  const handleFinished = async (event) => {
    event.preventDefault();
    if (selectedDoor && movieInfo) {
      try {
        setLoadingModal(true)
        const response = await fetch("/api/newChapter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const updatedChapters = await response.json();

          // Only add the new chapter, don't overwrite the entire state
          setChapters((prevChapters) => [
            ...prevChapters,
            updatedChapters[updatedChapters.length - 1],
          ]);
          setFinishedMovies((prev) => [...prev, selectedDoor]);
        } else {
          console.error("Failed to create a new chapter");
        }
      } catch (error) {
        console.error("Error creating a new chapter:", error);
      }
    }
    setLoadingModal(false)
    setSelectedDoor(null);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Redirect to /profile page
    router.push("/Profile");
  };

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.calendarTitle}>October Horror Calendar</h1>
      <h3 onClick={handleClick} className={styles.profileLink}>Profile</h3>
      {loading ? (
        <p>Loading movies...</p> // Loading indicator
      ) : (
        <div className={styles.doorsContainer}>
          {[...Array(31).keys()].map((day) => (
            <Card
              key={day}
              className={`${styles.door} ${
                finishedMovies.includes(day + 1) ? styles["door-open"] : ""
              }`}
            >
              <CardHeader onClick={() => openDoor(day + 1)}>
                <CardTitle>Day {day + 1}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {selectedDoor && (
        <MovieModal
          open={true}
          onClose={() => setSelectedDoor(null)}
          movieInfo={movieInfo}
          onFinished={handleFinished}
        loadingModal={loadingModal}
        />
      )}
    </div>
  );
};

export default Calendar;
