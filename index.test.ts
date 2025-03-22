import { describe, it, expect, afterEach } from 'vitest';
import supertest from 'supertest';
import { startServer } from './index';
import http from 'http';

describe('HTTP Server', () => {
    let server: http.Server;

    afterEach(() => {
        if (server) {
            server.close();
        }
    });

    it('should respond with "Hello from Docker!" on GET /', async () => {
        server = await startServer(0); // Use port 0 to let the OS assign a free port
        const port = (server.address() as any).port;
        
        const response = await supertest(`http://localhost:${port}`)
            .get('/')
            .expect(200);

        expect(response.text).toBe('Hello from Docker!');
    });
});