
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

console.log(cartItems);

// cart items container
let cartItemsSection = document.getElementById("product-cards");

// empty cart
if (!cartItems || cartItems.length === 0) {
    document.getElementById("empty-cart-text").classList.remove("d-none");
} else {
    document.getElementById("empty-cart-text").classList.add("d-none");
    showCartItems();
    totalToPay();
}



// chow the cart items
function showCartItems() {
    cartItems.forEach(product => {
        let productContainer = document.createElement("div");
        productContainer.style.maxWidth = "540px";
        productContainer.classList.add("card", "mb-3", "d-flex", "justify-content-center");

        let productSubcontainer = document.createElement("div");
        productSubcontainer.classList.add("row", "g-0");
        productContainer.appendChild(productSubcontainer);

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("col-md-4");
        productSubcontainer.appendChild(imgContainer);

        let imgTag = document.createElement("img");
        imgTag.src = product.imageUrl;
        imgTag.classList.add("img-fluid", "rounded-start");
        imgContainer.appendChild(imgTag);

        let infoContainer = document.createElement("div");
        infoContainer.classList.add("col-md-8");
        productSubcontainer.appendChild(infoContainer);

        let infoSubContainer = document.createElement("div");
        infoSubContainer.classList.add("card-body", "d-flex", "flex-column", "justify-content-between", "h-100");
        infoContainer.appendChild(infoSubContainer);

        let nameContainer = document.createElement("div");
        infoSubContainer.appendChild(nameContainer);

        let nameProduct = document.createElement("h5");
        nameProduct.classList.add("card-title");
        nameProduct.innerText = product.name;
        nameContainer.appendChild(nameProduct);

        let brandProduct = document.createElement("p");
        brandProduct.classList.add("card-text");
        brandProduct.innerText = `Brand: ${product.brand}`;
        nameContainer.appendChild(brandProduct);

        let priceProduct = document.createElement("p");
        priceProduct.classList.add("card-text");
        priceProduct.innerHTML = `<small class="text-body-secondary">${product.price.toFixed(2)} €</small>`;
        nameContainer.appendChild(priceProduct);

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("d-flex", "justify-content-between");
        infoSubContainer.appendChild(btnContainer);

        // let countContainer = document.createElement("div");
        // countContainer.classList.add("card-text", "w-25");
        // btnContainer.appendChild(countContainer);

        // let countTxt = document.createElement("span");
        // countTxt.classList.add("ms-1", "form-label");
        // countTxt.innerText = "Count: ";
        // countContainer.appendChild(countTxt);

        // let countInput = document.createElement("input");
        // countInput.classList.add("form-control");
        // countInput.value = 1;
        // countInput.type = "number";
        // countContainer.appendChild(countInput);
        // countInput.addEventListener("change", () => {
        //     totalToPay();
        // })

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "align-self-end");
        deleteBtn.innerHTML = `<i class="fas fa-trash-alt me-2"></i><span>Delete</span>`;
        btnContainer.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", () => {
            deletItem(product._id);
        });

        cartItemsSection.appendChild(productContainer);
    });
};



// fill total to pay section function
function totalToPay() {
    let subTotalToPay = 0;

    cartItems.forEach((product) => {
        subTotalToPay += product.price;
    });
    document.getElementById("subtotal-amount").innerText = subTotalToPay.toFixed(2);

    let shippingCost = subTotalToPay === 0 ? 0 : 15;
    document.getElementById("shipping-amount").innerText = shippingCost.toFixed(2);

    let totalToPay = subTotalToPay + shippingCost;
    document.getElementById("total-amount").innerText = totalToPay.toFixed(2);
};



// empty cart function
function emptyCart() {
    localStorage.removeItem("cartItems");
    location.reload();
};

// delete item from the cart:
function deletItem(id) {
    let newCartItems = [...cartItems];
    let cartItemToRemove = cartItems.findIndex(item => item._id === id);

    newCartItems.splice(cartItemToRemove, 1);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    location.reload();
};
