import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiKey from "../../data/apiKey";

export const gameListApi = createApi({
  reducerPath: "gameListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api",
  }),
  endpoints: (build) => ({
    getGameList: build.query({
      query: (options) => `games?${apiKey}&page=2&page_size=12&${options}`,
      transformResponse: (data, meta) => {
        const priceArr = [1849, 2199, 3249, 3399, 4499, 7599, 12899, 15999];
        data.results.map((game) => {
          return (game.price =
            priceArr[Math.floor(Math.random() * priceArr.length)]);
        });
        return data;
      },
    }),
  }),
});

export const { useGetGameListQuery } = gameListApi;
