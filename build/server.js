// 打包后测试脚本
// node server.js

let PORT = 8080; //端口
let DIR = "."; //用于存放html的目录
let http = require("http");
let url = require("url");
let fs = require("fs");

const typemaps = {
  css: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml",
};

let path = require("path");

function proxyRedirect(client_req, client_res) {
  var options = {
    hostname: "localhost",
    port: 8082,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers,
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers);
    res.pipe(client_res, {
      end: true,
    });
  });

  client_req.pipe(proxy, {
    end: true,
  });
}

let server = http.createServer(function (request, response) {
  let pathname = url.parse(request.url).pathname;
  if (pathname == "/") {
    pathname = "/index.html";
  }
  let realPath = path.join(DIR, pathname);

  let ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : "unknown";
  fs.exists(realPath, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        "Content-Type": "text/plain",
      });

      response.write(
        "This request URL " + pathname + " was not found on this server."
      );
      response.end();
    } else {
      fs.readFile(realPath, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/plain",
          });
          response.end(err);
        } else {
          let contentType = typemaps[ext] || "text/plain";
          response.writeHead(200, {
            "Content-Type": contentType,
          });
          response.write(file, "binary");
          response.end();
        }
      });
    }
  });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
