import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import apiKey from "../../data/apiKey";

export const topGamesApi = createApi({
  reducerPath: "topGamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api",
  }),
  endpoints: (build) => ({
    getTopGames: build.query({
      query: () => `games?${apiKey}&page=2&page_size=4&ordering=-rating`,
      transformResponse: (data, meta) => {
        const priceArr = [1849, 2199, 3249, 3399, 4499];
        data.results.map((game) => {
          return (game.price =
            priceArr[Math.floor(Math.random() * priceArr.length)]);
        });
        return data;
      },
    }),
  }),
});

export const { useGetTopGamesQuery } = topGamesApi;
