import express, { Request, Response } from "express";
import path from "path";
import dotenv from 'dotenv'
import apiRoutes from './routes/api'
import cors from 'cors' //cors é usado para outros sites acessarem sua api

dotenv.config()

const server = express()

//server.use(cors())//se nao colocar parametro nenhum, qualquer site pode acessar: origin: '*'

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({extended: true}))

server.use(apiRoutes) 

server.use((req: Request, res: Response) => {
    res.status(404)
    res.json({error: 'Endpoint não encontrado.'})
})

server.listen(process.env.PORT)