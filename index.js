import express from 'express';
import { create } from 'express-handlebars';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Instancia de express
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});

//INICIO CONFIGURACION HANDLEBARS

const hbs = create ({
    partialsDir: [
        path.resolve(__dirname, "./views/partials/"),
    ],
})


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));


// FIN CONFIGURACION HANDLEBARS

// INICIO MIDDLEWARES

app.use(express.static('public'));

// DEJAR PUBLICO LOS ARCHIVOS DE JQUERY Y BOOTSTRAP

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));



// FIN MIDDLEWARES

// Rutas de Vistas
app.get('/', (req, res) => {
    res.render('home', {
        titulo: 'Bienvenido al <strong> Mercado Web </strong>, seleccione sus productos',
        productos: [
            {id: 1, nombre: 'Banana', img: '/assets/img/banana.png'},
            {id: 2, nombre: 'Cebolla', img: '/assets/img/cebollas.png'},
            {id: 3, nombre: 'Lechuga', img: '/assets/img/lechuga.png'},
            {id: 4, nombre: 'Papas', img: '/assets/img/papas.png'},
            {id: 5, nombre: 'Pimentón', img: '/assets/img/pimenton.png'},
            {id: 6, nombre: 'Tomate', img: '/assets/img/tomate.png'}
        ]
    });
})