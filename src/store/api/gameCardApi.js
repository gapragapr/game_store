import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiKey from "../../data/apiKey";

export const gameCardApi = createApi({
  reducerPath: "gameCardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.rawg.io/api",
  }),
  endpoints: (build) => ({
    getGameCardInfo: build.query({
      query: (id) => `games/${id}?${apiKey}`,
    }),
    getScreenshots: build.query({
      query: (id) => `games/${id}/screenshots?${apiKey}`,
      cacheTime: 15 * 1000,
    }),
    getSystemRequirements: build.query({
      query: (id) => `games/${id}?${apiKey}`,
      transformResponse: (response) => {
        // Transform the response to extract system requirements
        const findedIndex = response.platforms.findIndex(
          (item) => item.platform.name == "PC"
        );
        return response.platforms[findedIndex];
      },
    }),
  }),
});

export const {
  useGetGameCardInfoQuery,
  useGetScreenshotsQuery,
  useGetSystemRequirementsQuery,
} = gameCardApi;
