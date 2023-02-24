import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueries = () => {
  useQuery("super-heroes", fetchSuperHeroes);
  useQuery("friends", fetchFriends);
  return (
    <>
      <h1>ParallelQueries</h1>
    </>
  );
};

export default ParallelQueries;
