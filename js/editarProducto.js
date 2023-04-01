const PARAMS_ID = new URLSearchParams(window.location.search).get('id')
//Valores_INPUT_CARD
let imgProductoP = document.querySelector('.imgProductoP')
let nomProd = document.getElementById('nomProd')
let descProd = document.getElementById('descProd')
let precProd = document.getElementById('precProd')
let catProd = document.getElementById('catProd')
let stockProd = document.getElementById('stockProd')
let linkProd = document.getElementById('linkProd')
let etiqProd = document.getElementById('etiqProd')
let btnEditProd = document.querySelector('.btnEditProd')
let listaCategoria = JSON.parse(localStorage.getItem('categoriaProductos'))
let valores_Producto
let valor_id_recibido
let valor_id_categoria_modificado
//Traer Datos del producto haciendo fetch a la api y comparandolo con el id del params
async function Traer_Producto (id) {
  let respuesta = await fetch(`https://slifer.bsite.net/td-producto/${id}`)
  respuesta = await respuesta.json()
  valores_Producto = respuesta[0]
  nomProd.value = valores_Producto.nombre
  descProd.value = valores_Producto.descripcion
  precProd.value = valores_Producto.precio
  valor_id_recibido = valores_Producto.idCategoria
  catProd.value = Valor_Cat_seleccionada()
  stockProd.value = valores_Producto.stock
  linkProd.value = valores_Producto.link
  etiqProd.value = valores_Producto.etiqueta
  imgProductoP.src = valores_Producto.link
}
Traer_Producto(PARAMS_ID)

//Trae el valor del nombre de la categoria
function Valor_Cat_seleccionada () {
  let nombreProducto
  if (valor_id_recibido !== 0) {
    nombreProducto = listaCategoria.find(
      product => product.id == valor_id_recibido
    )
    valor_id_recibido = 0
  } else {
    nombreProducto = listaCategoria.find(
      product => product.nombre == catProd.value
    )
  }
  valor_id_categoria_modificado = nombreProducto.id
  return nombreProducto.nombre
}

//Trer el nombre de la categoria seleccionada
//BUTTON ACTUALIZAR
btnEditProd.addEventListener('click', e => {
  e.preventDefault()
  let nomMod = nomProd.value
  let descMod = descProd.value
  let precMod = precProd.value
  let catMod = valor_id_categoria_modificado
  let stockMod = stockProd.value
  let linkMod = linkProd.value
  let etiqMod = etiqProd.value

  console.log(nomMod, descMod, precMod, catMod, stockMod, etiqMod, linkMod)
  actualizaInfo(nomMod, descMod, precMod, catMod, stockMod, etiqMod, linkMod)
  alert('Cambio satisfactorio!')

  //Recarga la página de productos
})

//modificar productos
async function actualizaInfo (
  nomMod,
  descMod,
  precMod,
  catMod,
  stockMod,
  etiqMod,
  linkMod
) {
  const response = await fetch('https://slifer.bsite.net/td-producto', {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credencials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      id: PARAMS_ID,
      nombre: nomMod,
      precio: precMod,
      link: linkMod,
      stock: stockMod,
      etiqueta: etiqMod,
      descripcion: descMod,
      idCategoria: catMod,
      idSucursal: 9
    })
  })

  //Recarga la página de productos
  setTimeout(function () {
    window.location.href = './productos.html'
  }, 2000)
}

//Trae la lista de categorias del local storage🛫🛫
let LlenaListadoCategoria = () => {
  listaCategoria.forEach(opcion => {
    const elemOpcion = document.createElement('option')
    elemOpcion.id = opcion.id
    elemOpcion.value = opcion.nombre
    elemOpcion.text = opcion.nombre
    document.getElementById('catProd').appendChild(elemOpcion)
  })
}
LlenaListadoCategoria()
