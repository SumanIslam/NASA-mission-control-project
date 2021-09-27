const parse = require('csv-parse');
const fs = require('fs');


const habitablePlanets = [];

const isHabitablePlanets = (planets) => {
  return planets['koi_disposition'] === 'CONFIRMED'
  && planets['koi_insol'] > 0.36 && planets['koi_insol'] < 1.11
  && planets['koi_prad'] < 1.6;
}

fs.createReadStream('../../data/kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true
  }))
  .on('data', (data) => {
    if(isHabitablePlanets(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(habitablePlanets.map(planet => {
      return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found`);
  });


module.exports = {
  planets:habitablePlanets,
}