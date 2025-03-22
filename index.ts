// server.ts
import http from 'http';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Docker!');
});

export function startServer(port: number = 8080): Promise<http.Server> {
    return new Promise((resolve) => {
        server.listen(port, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${port}/`);
            resolve(server);
        });
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
    startServer();
}