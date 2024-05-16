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

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use(constants.ROUTE_PREFIX_CANDIDATE, candidateRoutes);
app.use(constants.ROUTE_PREFIX_USER, userRoutes);
app.use(constants.ROUTE_PREFIX_ADVERSE_ACTION, adverseActionRoutes);
app.use(constants.ROUTE_PREFIX_COURT_SEARCH, courtSearchRoutes);
app.use(constants.ROUTE_PREFIX_SWAGGER_DOC, swaggerDoc.serve, swaggerDoc.setup(swaggerSpec));

app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode).json({ error: err.message, statusCode: err.statusCode });
})

database.sync()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(constants.ERROR_DATABASE_CONNECT + err));

const PORT = process.env.PORT
app.listen(PORT)
