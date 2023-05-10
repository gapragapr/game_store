import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiKey from "../../data/apiKey";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api",
  }),
  endpoints: (build) => ({
    getSearchResult: build.query({
      query: (name) => `games/${name.replace(/\s+/g, "-")}?${apiKey}`,
      transformResponse: (data, meta) => {
        const priceArr = [1849, 2199, 3249, 3399, 4499, 7599, 12899, 15999];
        return {
          ...data,
          price: priceArr[Math.floor(Math.random() * priceArr.length)],
        };
      },
    }),
  }),
});

export const { useGetSearchResultQuery } = searchApi;
