const request = require('supertest');
const app = require('../../app');

describe('Test GET /planets', () => {
  test('should be respond with 200 success', async () => {
    const response = await request(app)
      .get('/planets')
      .expect('Content-Type', /json/)
      .expect(200)
  });
  
})
