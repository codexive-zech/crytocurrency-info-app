import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewHeader = {
  "X-BingApis-SDK": `${process.env.REACT_APP_CRYPTO_NEWS_API_SDK}`,
  "X-RapidAPI-Key": `${process.env.REACT_APP_CRYPTO_NEWS_API_KEY}`,
  "X-RapidAPI-Host": `${process.env.REACT_APP_CRYPTO_NEWS_API_HOST}`,
}; // optional header needed to get data for cryptocurrency News from the api

const baseUrl = "https://bing-news-search1.p.rapidapi.com"; // url

const createNewsRequest = (url) => ({ url, headers: cryptoNewHeader }); // a method needed in the endpoint to create request includes URL and Headers

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi", // name of the redux slice
  baseQuery: fetchBaseQuery({ baseUrl }), // url needed
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createNewsRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }), // query endpoint to get cryptocurrencies News based on the news category
  }), // list of endpoints to be utilized
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
