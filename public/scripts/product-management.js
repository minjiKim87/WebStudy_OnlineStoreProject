const { response } = require("express");

const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);

function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;

  fetch("/ admin/products/" + productId + "?_csrf=" + csrfToken, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement;
}

function deleteProduct() {}
for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}
