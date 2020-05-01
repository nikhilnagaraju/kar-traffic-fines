# kar-traffic-fines 

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

Simple **JSON** API to fetch traffic fines for any KA registered vehicle. Can consider this as a simple proxy without CORS Blocking.
Hosted on [Heroku](https://heroku.com).

### Usage

|Title|Get Traffic Fines|
|----|----|
| Endpoint | `https://kar-traffic-fines.herokuapp.com` |
| Path | `/fines` |
| Method | `GET` |
| URL params | Required: `registration`=`KAXX(AZ)XXXX` |
| Error response <br> *Invalid Registration, Missing Registration param* | status code: `400`  <br> content: ```{status: 'error',message: 'A valid 'registration' param in 'KAXX(AZ)XXXX' format is required.'}```  |
| Example request | `https://kar-traffic-fines.herokuapp.com/fines?registration=KA02AB0123` |


#### Why is this API useful?
* No CORS Header blocking! Can be used on any client app, sites.
* JSON API to fetch/check fines. While you may find other APIs which gives a data in not-so-usable format.



## Development

Install dependancies
* `npm install` or `yarn`

Start dev server with file change watch
* `npm run serve` or `yarn serve`

Run linter
* `npm run lint` or `yarn lint`

Run Tests
* `npm run test` or `yarn test`

Run coverage
* `npm run coverage` or `yarn coverage`
