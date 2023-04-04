import server  from './app.js';
import { PORT } from '../db/config.js';

server.listen(PORT)

console.log('Server running at port: ' + PORT);