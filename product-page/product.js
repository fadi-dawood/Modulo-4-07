// Endpoint:
let urlPoint = "https://striveschool-api.herokuapp.com/api/product/";


// id of the active product
const paramObj = new URLSearchParams(window.location.search); // Oggetto con i vari query params
const productId = paramObj.get("id"); // Id del prodotto attivo...


window.onload = callProduct();

// Get call:
async function callProduct() {
    endpoint = urlPoint + productId;
    try {
        const res = await fetch(endpoint,
            {
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });

        const jsonArray = await res.json();
        console.log(jsonArray);
        showProduct(jsonArray)
    } catch (err) {
        console.log(`Error number : ${err}`);
    }
};

// show the product:
function showProduct(productObject) {
    document.getElementById("product-img").src = productObject.imageUrl;
    document.getElementById("product-name").innerText = productObject.name;
    document.getElementById("product-brand").innerText = `Brand: ${productObject.brand}`;
    document.getElementById("product-price").innerText = `Price: ${productObject.price} €`;
    document.getElementById("product-des").innerText = productObject.description;
};