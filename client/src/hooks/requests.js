import axios from 'axios';

const API_URL = "v1";
// http://localhost:5000/

// Load planets, and return as JSON.
async function httpGetPlanets() {
  const response = await axios.get(`${API_URL}/planets`);
  return response.data;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await axios.get(`${API_URL}/launches`);
  return response.data.sort((a,b) => {
    return a.flightNumber - b.flightNumber;
  })
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  // const { launchDate, mission, rocket, target } = launch;
  try {
    const response = await axios.post(`${API_URL}/launches`, launch);
    response.ok = true;
    return response;
  } catch(error) {
    return {
      ok: false
    }
  }
  
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const response = await axios.delete(`${API_URL}/launches/${id}`);
    response.ok = true;
    return response;
  } catch(err) {
    return {
      ok: false
    }
  } 
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};