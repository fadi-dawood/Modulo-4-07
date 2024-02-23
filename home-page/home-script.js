// DOM's dodes
// result section:
let resultCards = document.getElementById("cards");


// HTTP Get:
async function getCall() {
    try {
        const res = await fetch("https://striveschool-api.herokuapp.com/api/product/",
            {
                headers:
                    { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY' }
            });
        const myJson = await res.json();
        showResulte(myJson);
        console.log(myJson);
    } catch (err) {
        console.log(err);
    }
}
getCall();


// show the products in the DOM
function showResulte(array) {
    array.forEach(product => {

        let productContainer = document.createElement("div");
        productContainer.classList.add("card", "bg-dark", "border-0", "col-1");
        productContainer.style.width = "18rem";

        let productImg = document.createElement("img");
        productImg.src = product.imageUrl;
        productImg.classList.add("card-img");

        let productInfo = document.createElement("div");
        productInfo.classList.add("card-body", "text-white");

        let productName = document.createElement("h5");
        productName.classList.add("card-title");
        productName.innerText = product.name;

        let productPrice = document.createElement("p");
        productPrice.classList.add("fs-6", "fw-lighter","card-title");
        productPrice.innerHTML = `${product.price} €`;

        let productDes = document.createElement("p");
        productDes.classList.add("card-text");
        productDes.innerHTML = product.description;

        let producLink = document.createElement("p");
        producLink.classList.add("btn-primary", "btn");
        producLink.innerHTML = "Product details";


        productContainer.appendChild(productImg);
        productContainer.appendChild(productInfo);
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productDes);
        productInfo.appendChild(producLink);

        resultCards.appendChild(productContainer);

    });
}