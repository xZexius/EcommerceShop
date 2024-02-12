// Products Array
const products = [
    {
      id: 1,
      title: "Autumn Hoodie",
      price: 264.9,
      image:
        "https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426",
    },
    {
      id: 2,
      title: "FUSION HOODIE",
      price: 295,
      image:
        "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
    },
    {
      id: 3,
      title: "Chestnut Brown",
      price: 74.9,
      image:
        "https://pangaia.com/cdn/shop/products/Recycled-Cashmere-Core-Hoodie-Chestnut-Brown-Male-1.jpg?v=1663947464&width=1426",
    },
    {
      id: 4,
      title: "Nike Sportswear",
      price: 80,
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
    },
    {
      id: 5,
      title: "Champion BASIC",
      price: 48.99,
      image:
        "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
    },
    {
      id: 6,
      title: "Cotton Hoodie",
      price: 395,
      image:
        "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
    },
    {
      id: 7,
      title: "CLASSIC CREWNECK",
      price: 48.99,
      image:
        "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
    },
    {
      id: 8,
      title: "TAPE HOODED",
      price: 79.99,
      image:
        "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
    },
  ];
  

const productList = document.getElementById('productList');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');

function getCart(){
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(id) {
  let cart = getCart();
  
  // Verificar si el producto ya está en el carrito
  let existingItem = false; 
  if(cart.length > 0) {
    existingItem = cart.find(item => item.id === id);
  }

  if (existingItem) {
    // Incrementar la cantidad si ya está en el carrito
    existingItem.quantity += 1;
  } else {
    // Agregar el nuevo producto al carrito
    cart.push({ id: id, quantity: 1 });
  }

  // Guardar el carrito actualizado en el almacenamiento local
  localStorage.setItem('cart', JSON.stringify(cart));
}


function renderProducts() {
    productList.innerHTML = products
    .map(
        (product) => `
        <div class="product">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">${product.price.toFixed(2)}€</p>
                <button class="add-to-cart" data-id="${product.id}" onClick="addToCart(${product.id})">Add to cart</button>
            </div>
        </div>
        `
    )
    .join("");
}

// Render products on cart

function removeFromCart(id) {

  // Obtener el carrito actual desde el almacenamiento local
  const cart = getCart();

  // Filtrar el array para excluir el objeto con el ID especificado
  const newCart = cart.filter(item => item.id !== id);

  // Guardar el carrito actualizado en el almacenamiento local
  localStorage.setItem('cart', JSON.stringify(newCart));

  // Recargar la página actual
  location.reload();



}


function changeProductQuantity(id, quantity) {

  const cart = getCart();
  /* const product = cart.find(item => item.id === id);
  product.quantity = quantity */

  const newCart = cart.map(item => {
    if(item.id === id){
      item.quantity = quantity
    }
    return item
  })

  localStorage.setItem('cart', JSON.stringify(newCart));

  renderCartItems()

}

function renderCartItems() {

  let cart = getCart();

  if(cart.length > 0){
    cartItemsElement.innerHTML = cart.map((item) => {

      const product = products.find(prod => prod.id == item.id)
      console.log(product)

      return (`
        <div class="cart-item">
          <img src="${product.image}" alt="${product.title}">
          <div class="cart-item-info">
              <h2 class="cart-item-title">${product.title}</h2>
              <input 
              class="cart-item-quantity" 
              type="number" 
              name="" 
              min="1" 
              value="${item.quantity}" 
              data-id="${product.id}"
              onChange="changeProductQuantity(${product.id}, this.value)"
              />
          </div>
          <h2 class="cart-item-price">${product.price}</h2>
          <button class="remove-from-cart" onClick="removeFromCart(${product.id})">Remove</button>
        </div>
      `)
    }
  )
  .join("");
  }
}

// Check cart page

if(window.location.pathname.includes('cart.html')) {
  renderCartItems();
}else{
  renderProducts();
}