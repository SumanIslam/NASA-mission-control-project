const launchesDatabase = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['BD', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch)

async function saveLaunch(launch) {
  try {
    await launchesDatabase.updateOne({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    })
  } catch(err) {
    console.log(`Failed to save Launch: ${err.message}`);
  }
}

function isLaunchExist(launchId) {
  console.log(launches);
  return launches.has(launchId)
}

function getAllLaunches() {
  return Array.from(launches.values());
};

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber, 
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ['Bangladesh', 'NASA'],
      upcoming: true,
      success: true,
    })
  );
};

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

module.exports = {
  isLaunchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById
}