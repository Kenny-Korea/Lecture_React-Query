import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { useNavigate } from "react-router-dom";

// RQ는 기본적으로 캐싱을 지원함
// --> 한번 페이지를 fetching했으면, 해당 데이터를 기억해서, 다시 해당 페이지에 접속하게 되었을 때, 기존에 caching해둔 데이터를 표출

const fetchSuperHeroes = () => {
  // react-query는 data fetching에 실패해도 몇 차례 더 시도함
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroes = () => {
  const navigate = useNavigate();
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  // 최소 2개 이상의 인자를 넣어야 함
  // 첫 번째 인자: unique key, 두 번째 인자: Promise 객체, 세 번째 인자: 기타 옵션
  // destructuring 문법을 사용해서 바로 data와 isLoading key에 접근 가능
  // refetch라는 RQ 내장 객체를 사용해서, 이벤트 발생 시에 data fetching이 enabled 될 수 있도록 설정 가능

  // 아래와 같이 customHooks를 만들어서 사용 가능
  // const { isLoading, data, isError, error, isFetching, refetch } =
  //   useSuperHeroesData(onSuccess, onError);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // ? cacheTime: 지정한 시간 이후에 caching된 데이터가 자동으로 garbage collector로 이동함 (캐시 데이터 삭제됨) / default: 5분(300,000)
      // cacheTime: 5000,

      // ? staleTime: 데이터가 fresh -> stale 상태로 변경되는데 걸리는 시간(fresh 상태일때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 fetch가 일어나지 않음)
      // default: 0
      // staleTime: 30000,

      // refetchOnMount: 몰라
      refetchOnMount: true,

      // ? refetchOnWindowFocus: 데이터가 변경되면 자동으로 변경된 데이터를 fetching 해주는 옵션 / default: true
      // refetchOnWindowFocus: true,

      // ? refetchInterval: 자동으로 refetching하는 시간을 정함(실시간 주식 데이터 등에 유용) / default: false
      // refetchInterval: 3000,

      // ? refetchIntervalInBackground: 해당 화면에 focus되어 있지 않아도 계속 자동으로 refetching 해주는 옵션 / default: false
      // refetchIntervalInBackground: 3000,

      // ? enabled: data fetching 여부 선택. 이벤트 발생 시 fetching하게 하려면 false로 지정 후 이벤트 발생 시 refetch 함수 사용해주면 됨 / default: true
      // enabled: false,

      // ? onSuccess: onSuccess,
      // ? onError: onError,
      // ⭐️ key와 value명이 똑같을 경우에는 하나로만 사용해도 됨
      // onSuccess, onError: fetching 성공/실패 이후에 어떤 동작을 취하게 할 수 있는 콜백함수 옵션. data/error 인자 함께 반환하므로, 매개변수로 넣어줄 수 있음
      onSuccess,
      onError,

      // ? select: data transformation에 사용됨. return문에 직접 map함수 등을 사용하는 것보다 더 유용하게 데이터를 sorting할 수 있음
      // select: (data) => {
      //   const superHeroNmaes = data.data.map((hero) => hero.name);
      //   return superHeroNmaes;
      // },
    }
  );
  // const fetchedData = useQuery("super-heroes", fetchSuperHeroesz);
  // console.log(fetchedData);
  // console.log(isFetching);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {/* ? 을 사용함으로써 data가 없어도 에러를 내지 않음 */}
      {data?.data.map((hero) => {
        return (
          <div
            key={hero.id}
            onClick={() => {
              navigate(`${hero.id}`);
              // ! 아래와 같이 지정하면 잘 동작하지 않음
              // navigate(hero.id);
            }}
          >
            {hero.name}
          </div>
        );
      })}
      {/* {
        // 아래의 data는 상단 select key의 superHeroNames를 기리킴
        data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>;
        })
      } */}
    </>
  );
};

export default RQSuperHeroes;
