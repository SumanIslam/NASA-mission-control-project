const axios = require('axios');
const { populate } = require('./launches.mongo');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

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

saveLaunch(launch);

const SPACEX_API_URL = `https://api.spacexdata.com/v4/launches/query`;

async function populateLaunch() {
  console.log('Downloading Launches Data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
              name: 1
          }
        },
        {
          path: "payloads",
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  const launchDocs = response.data.docs;

  for(const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => payload['customers']);

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    }

    console.log(`${launch.flightNumber} ${launch.mission}`);

    // TODO: save launch to database
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    mission: 'FalconSat',
    rocket: 'Falcon 1',
  })

  if(firstLaunch) {
    console.log('Launches data is already loaded');
  } else {
    await populateLaunch();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter)
}

async function isLaunchExist(launchId) {
  return await findLaunch({ flightNumber: launchId })
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
    if (!planet) {
      throw new Error('No matching planet found')
    }
    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    })
  } catch(err) {
    console.log(`Failed to save Launch: ${err.message}`);
  }
}

async function getAllLaunches() {
  try {
    return await launchesDatabase.find({}, {
      '_id': 0,
      '__v': 0,
    });
  } catch(err) {
    console.log(`could not fetch Launches: ${err.message}`);
  }
};

async function getLatestFlightNumber() {
  try {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
    console.log(latestLaunch.flightNumber);

    if(!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
  } catch(err) {
    console.log(`Could not get the latest flightNumber: ${err.message}`);
  }
}

async function addNewLaunch(launch) {
  const latestFlightNumber = Number(await getLatestFlightNumber()) + 1;
  console.log(latestFlightNumber);
  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ['Bangladesh', 'NASA'],
    upcoming: true,
    success: true,
  });

  await saveLaunch(launch)
};

async function abortLaunchById(launchId) {
  const aborted =  await launchesDatabase.updateOne({
    flightNumber: launchId
  }, {
    success: false,
    upcoming: false,
  });

  return aborted;
}

module.exports = {
  loadLaunchData,
  isLaunchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById
}