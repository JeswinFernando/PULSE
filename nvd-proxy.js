exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  const keyword = event.queryStringParameters && event.queryStringParameters.keyword;
  if (!keyword) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing keyword parameter' }) };
  }

  const url = 'https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=' +
    encodeURIComponent(keyword) + '&resultsPerPage=20';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { statusCode: res.status, headers, body: JSON.stringify({ error: 'NVD HTTP ' + res.status }) };
    }
    const data = await res.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
