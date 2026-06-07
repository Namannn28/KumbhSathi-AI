const axios = require('axios');

async function run() {
  try {
    console.log("Fetching CSRF token...");
    const csrfRes = await axios.get('http://localhost:3000/api/auth/csrf');
    const csrfToken = csrfRes.data.csrfToken;
    const initialCookies = csrfRes.headers['set-cookie'];
    console.log("CSRF Token:", csrfToken);
    console.log("Initial Cookies:", initialCookies);

    const cookieHeader = initialCookies ? initialCookies.map(c => c.split(';')[0]).join('; ') : '';

    console.log("\nAttempting login...");
    const loginRes = await axios.post(
      'http://localhost:3000/api/auth/callback/credentials',
      new URLSearchParams({
        phone: '9876543210',
        otp: '123456',
        csrfToken: csrfToken,
        json: true
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader
        },
        maxRedirects: 0,
        validateStatus: () => true
      }
    );

    console.log("Login Response Status:", loginRes.status);
    console.log("Login Response Headers:", JSON.stringify(loginRes.headers, null, 2));
    console.log("Login Response Data:", loginRes.data);

    const responseCookies = loginRes.headers['set-cookie'];
    console.log("Login Response Cookies:", responseCookies);

    if (responseCookies) {
      const mergedCookies = [
        ...initialCookies ? initialCookies.map(c => c.split(';')[0]) : [],
        ...responseCookies.map(c => c.split(';')[0])
      ].join('; ');

      console.log("\nFetching session with cookies:", mergedCookies);
      const sessionRes = await axios.get('http://localhost:3000/api/auth/session', {
        headers: {
          'Cookie': mergedCookies
        }
      });
      console.log("Session Response Status:", sessionRes.status);
      console.log("Session Data:", sessionRes.data);
    } else {
      console.log("\nNo cookies returned from login!");
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
}

run();
