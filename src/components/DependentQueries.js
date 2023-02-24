import { useQuery } from "react-query";
import axios from "axios";
import React from "react";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/users/${channelId}`);
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  useQuery(["courses", channelId], () => fetchCoursesByChannelId(email), {
    enabled: !!channelId,
  });
  return (
    <>
      <div className="DependentQueries">Dependent Queries</div>
    </>
  );
};

export default DependentQueries;
