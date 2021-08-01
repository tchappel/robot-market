import { FetchedRobot } from "types";

const fetchRobots = async (): Promise<FetchedRobot[]> => {
  const response = await fetch("http://localhost:8000/api/robots");
  const { data } = await response.json();
  return data;
};

const robotsAPI = {
  fetchRobots,
};

export default robotsAPI;
