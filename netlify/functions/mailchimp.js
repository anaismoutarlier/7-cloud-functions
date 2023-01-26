const MailChimp = require("mailchimp-api-v3");
const md5 = require("md5");

const { LIST_ID, MC_API_KEY } = process.env;

const mailchimp = new MailChimp(MC_API_KEY);

const validateEmail = email => {
  if (typeof email !== "string") return false;

  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(email);
};

exports.handler = async event => {
  if (event.httpMethod.toLowerCase() !== "post") {
    return {
      statusCode: 404,
      statusText: "Method unauthorized",
    };
  }

  console.log({ event });

  const { email } = JSON.parse(event.body);
  console.log({ email });

  if (!email) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Please provide an email address to suscribe." }),
    };
  }

  if (!validateEmail(email)) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `The email address ${email} is not valid.` }),
    }
  }

  try {
    const hash = md5(email);
    await mailchimp.put(`/lists/${LIST_ID}/members/${hash}`, {
      email_address: email,
      status: "subscribed",
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `The email address ${email} was successfully added.` })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Subscription failed." })
    }
  }

};
