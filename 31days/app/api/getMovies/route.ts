
//@ts-nocheck
// app/api/getMovies/route.ts
import { NextResponse } from "next/server";

const years = Array.from({ length: 2024 - 1980 + 1 }, (_, i) => 1980 + i);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  const movies = [];
  try {
    for (const year of years) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=6d7d72f24c357d61382d2fe21374dd96&language=en-US&with_genres=27&primary_release_year=${year}&page=1`
      );
      const data = await response.json();

      if (data.results) {
        const randomSelections = data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        for (const movie of randomSelections) {
          const movieDetailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=6d7d72f24c357d61382d2fe21374dd96&language=en-US&append_to_response=credits`
          );
          const movieDetails = await movieDetailsResponse.json();

          movies.push({
            id: movieDetails.id,
            title: movieDetails.title,
            director: movieDetails.credits?.crew.find(
              (crewMember) => crewMember.job === "Director"
            )?.name,
            plot: movieDetails.overview,
            releaseDate: movieDetails.release_date,
            imageUrl: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          });

          if (movies.length >= 31) break;
          await delay(34); // 34ms delay to stay below 30 requests per second
        }
      }

      if (movies.length >= 31) break;
      await delay(34); // 34ms delay to stay below 30 requests per second
    }

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.error();
  }
}
