const formData = require("form-data");
const os = require("os");
const url = "https://api.deepai.org/hacking_is_a_serious_crime";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

const data = new formData();
data.setBoundary("----WebKitFormBoundaryKOfmpHRT0cfLH1N0");

data.append("online", "online");
data.append("search", "search");
data.append("chat_style", "chat");
data.append("chatHistory", JSON.stringify([{ role: "user", content: "hi" }]));
console.log(data);

const q = (function () {
  for (var A = [], F = 0; 64 > F; )
    A[F] = 0 | (4294967296 * Math.sin(++F % Math.PI));
  return function (B) {
    var G,
      K,
      L,
      ba = [(G = 1732584193), (K = 4023233417), ~G, ~K],
      V = [],
      x = unescape(encodeURI(B)) + "\u0080",
      v = x.length;
    B = (--v / 4 + 2) | 15;
    for (V[--B] = 8 * v; ~v; ) V[v >> 2] |= x.charCodeAt(v) << (8 * v--);
    for (F = x = 0; F < B; F += 16) {
      for (
        v = ba;
        64 > x;
        v = [
          (L = v[3]),
          G +
            (((L =
              v[0] +
              [(G & K) | (~G & L), (L & G) | (~L & K), G ^ K ^ L, K ^ (G | ~L)][
                (v = x >> 4)
              ] +
              A[x] +
              ~~V[F | ([x, 5 * x + 1, 3 * x + 5, 7 * x][v] & 15)]) <<
              (v = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][
                4 * v + (x++ % 4)
              ])) |
              (L >>> -v)),
          G,
          K,
        ]
      )
        (G = v[1] | 0), (K = v[2]);
      for (x = 4; x; ) ba[--x] += v[x];
    }
    for (B = ""; 32 > x; )
      B += ((ba[x >> 3] >> (4 * (1 ^ x++))) & 15).toString(16);
    return B.split("").reverse().join("");
  };
})();

const p = Math.round(1e11 * Math.random()) + "";

const key = q(userAgent + q(userAgent + q(userAgent + p + "x")));

const apiKey = `tryit-${p}-${key}`;

console.log(apiKey);

fetch(url, {
  method: "OPTIONS",
  headers: {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "Access-Control-Request-Headers": "api-key",
    "Access-Control-Request-Method": "POST",
    "Cache-Control": "no-cache",
    Origin: "https://deepai.org",
    Pragma: "no-cache",
  },
}).then(async (v) => {
  if (v.ok) {
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Api-Key": apiKey,

        "Content-Type": "multipart/form-data; boundary=" + data.getBoundary(),
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "User-Agent": userAgent,
        Origin: "https://deepai.org",
        Pragma: "no-cache",
      },
      body: data,
    })
      // .then((response) => response.json())
      .then(async (data) => {
        console.log("Success:", await data.text());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
