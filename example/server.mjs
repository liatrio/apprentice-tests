// Minimal app that meets the exercise spec, used by CI.
import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 8080);

createServer((req, res) => {
    if (req.method === "GET" && new URL(req.url, "http://localhost").pathname === "/") {
        const body = JSON.stringify({ message: "My name is Example", timestamp: Date.now() });
        res.writeHead(200, { "content-type": "application/json" });
        res.end(body);
        return;
    }
    res.writeHead(404, { "content-type": "text/plain" });
    res.end(`Cannot ${req.method} ${req.url}`);
}).listen(port);
