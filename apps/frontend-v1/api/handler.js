const { createServer } = require('node:http');
const { parse } = require('node:url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Prepare the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Lambda handler
exports.main = async (event, context) => {
  // Convert API Gateway event to HTTP request
  const { httpMethod, path, headers, queryStringParameters, body } = event;

  // Create a mock request object
  const req = {
    method: httpMethod,
    url: path,
    headers: headers || {},
    query: queryStringParameters || {},
    body: body,
  };

  // Create a mock response object
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader: function (name, value) {
      this.headers[name] = value;
    },
    write: function (chunk) {
      this.body += chunk;
    },
    end: function (chunk) {
      if (chunk) this.body += chunk;
    },
  };

  try {
    // Handle the request with Next.js
    await handle(req, res);

    // Return the response in API Gateway format
    return {
      statusCode: res.statusCode || 200,
      headers: {
        'Content-Type': res.headers['content-type'] || 'text/html',
        ...res.headers,
      },
      body: res.body,
    };
  } catch (error) {
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Internal Server Error',
    };
  }
};
