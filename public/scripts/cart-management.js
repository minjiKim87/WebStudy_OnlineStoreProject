const { response } = require("express");

const addToCartButtonElement = document.querySelector(
  "#product-details button"
);
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrfToken;

  let response;

  try {
    fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  if (responseData.updatedCartData.updatedItemPrice === 0) {
  }

  const cartItemTotalPriceElement =
    form.parentElement.querySelector(".cart-item-price");
  cartItemTotalPriceElement.textContent =
    responseData.updatedCartData.updatedItemPrice.toFixed(2);

  const newTotalQuantity = responseData.newTotalItems;

  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener("click", addToCart);
