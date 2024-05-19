import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { database } from './config/db'
import candidateRoutes from './routes/candidate'
import userRoutes from './routes/user'
import adverseActionRoutes from './routes/adverse_action'
import { GlobalError } from './utils/exceptionHandling/GlobalError'
import swaggerDoc from 'swagger-ui-express'
import swaggerSpec from './utils/swagger'
import bodyParser from 'body-parser'
import courtSearchRoutes from './routes/courtSearch'
import * as constants from './utils/constants'; 
import session from 'express-session'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()

app.use(session({
  secret: 'my secret',
  resave: false, // this means that session will not be save for every req but only when something change in session,
  saveUninitialized: false
  }))
app.use(bodyParser.json())


app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(constants.ROUTE_PREFIX_CANDIDATE, candidateRoutes);
app.use(constants.ROUTE_PREFIX_USER, userRoutes);
app.use(constants.ROUTE_PREFIX_ADVERSE_ACTION, adverseActionRoutes);
app.use(constants.ROUTE_PREFIX_COURT_SEARCH, courtSearchRoutes);
app.use(authRoutes)
app.use(constants.ROUTE_PREFIX_SWAGGER_DOC, swaggerDoc.serve, swaggerDoc.setup(swaggerSpec));

app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode).json({ error: err.message, statusCode: err.statusCode });
})

database.sync()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(constants.ERROR_DATABASE_CONNECT + err));

const PORT = process.env.PORT
app.listen(PORT)