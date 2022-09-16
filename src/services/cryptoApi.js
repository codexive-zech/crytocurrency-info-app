import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeader = {
  "X-RapidAPI-Key": `${process.env.REACT_APP_CRYPTO_API_KEY}`,
  "X-RapidAPI-Host": `${process.env.REACT_APP_CRYPTO_API_HOST}`,
}; // optional header needed to get data from the cryptocurrency api

const baseUrl = "https://coinranking1.p.rapidapi.com/"; // url

const createRequest = (url) => ({ url, headers: cryptoApiHeader }); // a method needed in the endpoint to create request includes URL and Headers

export const cryptoApi = createApi({
  reducerPath: "CryptoApi", // name of the redux slice
  baseQuery: fetchBaseQuery({ baseUrl }), // url needed
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }), // query endpoint to get list of cryptocurrencies
    getCryptoDetail: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }), // query endpoint to get single cryptocurrency details
  }), // list of endpoints to be utilized
});

export const { useGetCryptosQuery, useGetCryptoDetailQuery } = cryptoApi;
