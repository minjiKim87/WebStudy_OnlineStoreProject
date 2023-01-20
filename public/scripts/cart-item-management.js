const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;

  try {
    const response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSOM.stringify({
        productId: productId,
        newQuantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  const cartItemTotalPriceElement =
    form.parentElement.querySelector(".cart-item-price");
  cartItemTotalPriceElement.textContent =
    responseDAta.updatedCartItem.updatedItemPrice;

  const cartTotalPriceElement = document.getElementById("cart-total-price");
  cartTotalPriceElement.textContent = responseData.newTotalPrice.toFixed(2);

  const cartBadge = document.querySelector(".nav-items .badge");
  cartBadge.textContent = responseData.newTotalQuantity;
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit");
}
