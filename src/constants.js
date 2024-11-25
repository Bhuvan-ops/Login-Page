// constants.js

const PORTS = {
  SERVER: 5000,
};

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const API_URLS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};

module.exports = { STATUS_CODES, API_URLS, PORTS };
