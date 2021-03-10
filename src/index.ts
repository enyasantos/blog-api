import "reflect-metadata"
import { createConnection } from 'typeorm'
import * as express from "express"
import * as bodyParser from "body-parser"
import routes from "./routes"
import { resolve } from "path"
import * as cors from "cors"
require('dotenv').config()

const app = express()
createConnection()
app.use(cors())
app.use(bodyParser.json())
app.use(routes)
app.use("/media", express.static(resolve(__dirname, "..", "public")))

app.listen(3008, () => console.log("🔥 - Server is running in port 3008."))
