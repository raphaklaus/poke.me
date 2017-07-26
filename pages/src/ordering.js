let cart = {
  pokemons: []
};

const addToCart = (pokemon) => {
  cart.pokemons.push(pokemon);
  alert('Pokemon add to cart!');
};

const order = () => {
  if (cart.pokemons.length === 0)
    alert('You haven\'t put a Pokemon in your cart');
  else
    axios.post('/carts', { cart: cart }).then(data => {
      location.href = data.request.responseURL;
    }).catch(error => alert(error));
};

export { addToCart, order };
