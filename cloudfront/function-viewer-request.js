function handler(event) {
  var request = event.request;
  var uri = request.uri || "/";

  // Normalize multiple slashes
  uri = uri.replace(/\/{2,}/g, "/");

  // If the request is for a file (has an extension), leave it as-is.
  // Examples: /assets/css/styles.css, /favicon.ico, /robots.txt
  if (/\.[a-zA-Z0-9]+$/.test(uri)) {
    request.uri = uri;
    return request;
  }

  // Redirect /index.html -> /
  if (uri === "/index.html") {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "/" },
        "cache-control": { value: "public, max-age=3600" },
      },
    };
  }

  // Redirect /<slug>.html -> /<slug>/
  var htmlMatch = uri.match(/^\/(.+)\.html$/);
  if (htmlMatch && htmlMatch[1]) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "/" + htmlMatch[1] + "/" },
        "cache-control": { value: "public, max-age=3600" },
      },
    };
  }

  // Enforce trailing slash for "page" URLs (directories)
  if (uri.length > 1 && uri.charAt(uri.length - 1) !== "/") {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: uri + "/" },
        "cache-control": { value: "public, max-age=3600" },
      },
    };
  }

  // Map /<dir>/ -> /<dir>/index.html for S3 origin
  // This is NOT a redirect; it rewrites the request to the actual object key.
  if (uri === "/") {
    request.uri = "/index.html";
    return request;
  }

  request.uri = uri + "index.html";
  return request;
}

