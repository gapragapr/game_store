import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiKey from "../../data/apiKey";

export const recomendedApi = createApi({
  reducerPath: "recomendedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api",
  }),
  endpoints: (build) => ({
    getRecomended: build.query({
      query: () => `games?${apiKey}&page_size=8&ordering=-sales`,
      transformResponse: (data, meta) => {
        const newPriceArr = [249, 549, 749, 1499];
        const oldPriceArr = [1849, 2199, 3249, 3399, 4499];
        data.results.map((game) => {
          return (game.price =
            newPriceArr[Math.floor(Math.random() * newPriceArr.length)]);
        });
        data.results.map((game) => {
          return (game.old_price =
            oldPriceArr[Math.floor(Math.random() * oldPriceArr.length)]);
        });
        return data;
      },
    }),
    getDescription: build.query({
      query: (id) => `games/${id}?${apiKey}`,
      transformResponse: (data, meta) => {
        return data;
      },
    }),
  }),
});

export const { useGetRecomendedQuery, useGetDescriptionQuery } = recomendedApi;
