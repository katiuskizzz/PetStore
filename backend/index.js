import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import routePets from './src/routes/mascotas.routes.js'
import routeUser from './src/routes/user.routes.js'
import routeCategorias from './src/routes/categorias.routes.js'
import routeGeneros from './src/routes/generos.routes.js'
import routeRazas from './src/routes/razas.routes.js'

const app = express()
app.use(cors())
const PORT = 4000

app.use(body_parser.json())
app.use(body_parser.urlencoded({extend: false}))

app.use('/user', routeUser)
app.use('/pets', routePets)
app.use('/categoria', routeCategorias)
app.use('/genero', routeGeneros)
app.use('/razas', routeRazas)

app.set("view engine", "ejs")
app.set("views", "./view")

app.use(express.static('./public'))

app.get("/documents", (req, res) => {
    res.render("document.ejs")
})

app.listen(4000, () => {
    console.log(`En ejecucion en el puerto  ${PORT}`);
})