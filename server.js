const express = require("express");
const { todoLoQueNoEsteDefinido } = require("./utils");
const app = express();
// console.log(app)

// Middleware: Las páginas estáticas
app.use(express.static("public"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variable de entorno. Enviroment varibles
console.log("__dirname", __dirname);

// Variables
let contadorVisitas = 0;

// Productos almacenados

let productos = [];

let idProducto = 0

/* ------------------------- RUTA GET - Para obtener un producto ------------------------------ */

app.get("/", (req, res) => {
  // res.send('Hola mundo')
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/info", (req, res) => {
  res.send('<h2 style="color:green">Servidor EXPRESS OK</h2>');
});

app.get("/visitas", (req, res) => {
  res.send(`<h2 style="color:blueviolet">Visitas: ${++contadorVisitas}</h2>`);
});

app.get("/reset", (req, res) => {
  contadorVisitas = 0;
  res.send(`<h3 style="color:violet">RESET OK</h3>`);
});

// app.get('/api/productos', (req, res) => {
//     res.json(productos)
// })

app.get("/api/productos/:id?", (req, res) => {
  let id = req.params.id;
  //console.log(id)

  if (id) {
    let producto =
      productos.find((producto) => producto.id === Number(id)) || {};
  } else {
    res.json(productos);
  }
});

app.get("*", todoLoQueNoEsteDefinido);

/* ------------------------- RUTA POST - Para crear un producto ------------------------------ */

app.post("/api/productos", (request, response) => {
  let producto = request.body;
  producto.id = ++idProducto;

  productos.push(producto);
  //response.json(producto)
  response.redirect("/");
});


/* ------------------------- RUTA PUT - Para actualizar un producto ------------------------------ */

app.put('/api/productos/:id', (req, res) => {
    let id = req.params.id
    let producto = req.body
    producto.id = id

    let index = productos.findIndex(producto => producto.id == id)
    productos.splice(index, 1, producto)
    res.json(producto)
})

/*--------------------------------------------------------------------------------------*/

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor HTTP con Express ${PORT}`);
});