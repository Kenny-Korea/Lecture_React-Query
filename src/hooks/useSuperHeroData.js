import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  // console.log(`http://localhost:4000/superheroes/${heroId}`);
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery(["super-hero", heroId], () => {
    return fetchSuperHero(heroId);
  });
};
