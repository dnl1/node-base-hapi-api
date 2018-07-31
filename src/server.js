'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Routes = require('./routes');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

(async () => {
    const server = await new Hapi.Server({
        host: host,
        port: port,
    });
    
    const swaggerOptions = {
        info: {
                title: 'CS Presentation API Documentation',
                version: Pack.version,
            },
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    
    server.route(Routes);
})();