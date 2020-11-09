import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from '../config/config.js';
import apiRouter from './routes/apiRouter.js';
import {connectToDatabase} from './connectMongodb.js';

//connect to database
const db = connectToDatabase().on(
   "error",
   console.error.bind(console, "MongoDB connection error:")
 );
 db.once("open", () => {
   console.log("Successfully connected to mongoose database!");
   
 });

//initialize app
const app = express();

//enable request logging for development debugging
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//Serve File resources
app.use(express.static("../"));

//Serves the API
app.use('/api/', apiRouter);

//404 - resource not found
app.all('/*', (req, res) => {

    /*Add YOUR CODE HERE
       see https://expressjs.com/en/api.html#res.sendFile
       see https://nodejs.org/api/path.html
       The path.resolve() method returns a string and resolves a sequence of paths or path segments into an absolute path.
       If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
    */
   res.statusCode === 404 ? res.send('Sorry, information not available') : res.sendFile(path.resolve('./web/index.htm'))
        
});

app.listen(config.port, () => console.log(`App now listening on port ${config.port}`));
