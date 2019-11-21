const LOCALSTORAGE_CART_NAME = 'cart';

export const addItem = (item:  any, next: any) => {
  let cart: any = [];

  if (typeof window !== 'undefined') {
    // get item from local storage
    if (localStorage.getItem(LOCALSTORAGE_CART_NAME)) {
      cart = JSON.parse(`${localStorage.getItem(LOCALSTORAGE_CART_NAME)}`)
    }

    cart.push({
      ...item,
      count: 1
    })

    // Remove duplicate items from cart
    cart = Array.from(new Set(cart.map((item: any) => (item._id)))).map(id => {
      return cart.find((product: any) => product._id === id)
    })

    localStorage.setItem(`${LOCALSTORAGE_CART_NAME}`, JSON.stringify(cart))

    next()
  }
}