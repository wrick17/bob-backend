import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import apiRoutes from './routes/api-routes'

mongoose.connect('mongodb://localhost/test');

const apiServer = express()
apiServer.use(bodyParser.json())
apiServer.use(cookieParser())
apiServer.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
apiRoutes(apiServer);

apiServer.listen(8000, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:8000')
})