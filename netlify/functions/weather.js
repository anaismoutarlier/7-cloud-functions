const OWM_API_KEY = "";
const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${48.864716}&lon=${2.349014}&appid=${OWM_API_KEY}`;
    const data = await fetch(endpoint);
    const json = await data.json();

    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString(), stack: err.stack }),
    };
  }

  //.then().then().then().catch()
};
