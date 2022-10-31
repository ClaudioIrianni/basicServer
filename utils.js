const todoLoQueNoEsteDefinido = (request, response) => {
    /* let url = request.url
    let method = request.method */
    let {url, method } = request
    response.status(404).send(`<h3 style="color:orangered;">La ruta ${url} del método ${method} no está implementada`)
}

module.exports = {
    todoLoQueNoEsteDefinido
}
