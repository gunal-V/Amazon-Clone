export let cart = JSON.parse( localStorage.getItem('cart') ) ||
[
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: '1'
  },{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId: '2'
  }
];


export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}


function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;

  const quantityElement = document.querySelector(`.item-quantity-${productId}`);
  let quantity = Number(quantityElement.value);

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveCart();
}

export function removeFromCart(productId){
  const temp = [];
  cart.forEach( (item) => {
    if(item.productId !== productId){
      temp.push(item);
    }
  });
  cart = temp;
  saveCart();
}

export function updateCartQuantity(productId, newQuantity){
  cart.forEach((item) => {
    if(item.productId === productId){
      item.quantity = newQuantity;
    }
  });
  saveCart();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveCart();
}