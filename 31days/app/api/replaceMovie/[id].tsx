//@ts-nocheck

// app/api/replaceMovie/[id].ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { id } = req.params;
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const similarResponse = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=horror&type=movie&page=2`
    );
    const similarData = await similarResponse.json();

    if (!similarData.Search) {
      throw new Error("Failed to fetch replacement movie.");
    }

    // Replace movie with one from the second page or similar results
    const replacementMovie =
      similarData.Search.find((movie) => movie.imdbID !== id) ||
      similarData.Search[0];

    const movieDetailsResponse = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${replacementMovie.imdbID}`
    );
    const movieDetails = await movieDetailsResponse.json();

    const movie = {
      id: movieDetails.imdbID,
      title: movieDetails.Title,
      director: movieDetails.Director,
      plot: movieDetails.Plot,
      releaseDate: movieDetails.Released,
      imageUrl: movieDetails.Poster,
    };

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error replacing movie:", error);
    return NextResponse.error();
  }
}
