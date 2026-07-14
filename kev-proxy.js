exports.handler = async function () {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { statusCode: res.status, headers, body: JSON.stringify({ error: 'KEV HTTP ' + res.status }) };
    }
    const data = await res.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
