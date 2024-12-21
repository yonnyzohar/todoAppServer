require('dotenv').config();
import Server from './Server';


let PORT = process.env.PORT || 5001;

if(typeof PORT === 'string')
{
    PORT = parseInt(PORT);
}

// Initialize and start the server
const server = new Server();
server.start(PORT);