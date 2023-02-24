import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  // ? react-query는 data fetching에 실패해도 몇 차례 더 시도함
  return axios.get("http://localhost:4000/superheroes");
};

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    select: (data) => {
      const superHeroNmaes = data.data.map((hero) => hero.name);
      return superHeroNmaes;
    },
  });
};
