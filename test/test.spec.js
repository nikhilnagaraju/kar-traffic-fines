import test from'ava';
import{ agent }from'supertest';
import app from'../app';
const appServer = agent(app);

const registrationPattern = RegExp(/^ka(?!00)([0-6][0-9]|70)[a-z]{0,2}[0-9]{4}$/i);

test('[Success] Server status check', async (t) => {
   const res = await appServer.get('/').expect(200);
   const expectedResponse = {
      status: 'ok',
      message: 'Why say hello world!, when you can say HELLO UNIVERSE!'
   };
   t.deepEqual(res.body, expectedResponse);
});

test('[Sucess] Valid Registration', (t) => {
   t.regex('KA021234', registrationPattern, 'Reg. No without category');
   t.regex('KA02A1234', registrationPattern, 'Reg. No with single alphabet category');
   t.regex('KA02AB1234', registrationPattern, 'Reg. No with category');
   t.regex('KA02AB0034', registrationPattern, 'Reg. No with prepended 0\'s');
   t.regex('ka02ab0034', registrationPattern, 'Lowercase Reg. No');
});

test('[Fail] Invalid Registration', (t) => {
   t.notRegex('KA1234', registrationPattern, 'No RTO');
   t.notRegex('KA001234', registrationPattern, 'Invalid 00 RTO');
   t.notRegex('KA71AB1234', registrationPattern, 'Invalid RTO');
   t.notRegex('KA02AB12', registrationPattern, 'Invalid number');
   t.notRegex('GJ02A1234', registrationPattern, 'Non Karnataka Reg. No');
});

test('[Success] Valid Karnataka One response', async (t) => {
   const res = await appServer.get('/fines').query({ registration: 'KA02AB1234' }).expect(200);
   t.truthy('PoliceFineDetailsList' in res.body);
   t.truthy('TotalFineAmount' in res.body);
   t.truthy('Response' in res.body);
});

test('[Fail] Missing registration param', async (t) => {
   const res = await appServer.get('/fines').expect(400);
   const expectedResponse = {
      status: 'error',
      message: 'A valid \'registration\' param in \'KAXX(AZ)XXXX\' format is required.'
   };
   t.deepEqual(res.body, expectedResponse);
});

test('[Fail] Invalid registration param', async (t) => {
   const res = await appServer.get('/fines').query({ registration: 'KA1234' }).expect(400);
   const expectedResponse = {
      status: 'error',
      message: 'A valid \'registration\' param in \'KAXX(AZ)XXXX\' format is required.'
   };
   t.deepEqual(res.body, expectedResponse);
});

test('[Fail] Invalid endpoints', async (t) => {
   const res = await appServer.get('/random/endpoint').expect(400);
   const expectedResponse = {
      status: 'error',
      message: 'use \'/fines\' endpoint with \'registration\' query param in \'KAXX(AZ)XXXX\' format to check fines.'
   };
   t.deepEqual(res.body, expectedResponse);
});
