// result section (DOM's node): 
let resultCards = document.getElementById("cards");

// copy of the json array for the filter function
let filteredJson;

// load all products when the page is loaded
window.onload = getCall();

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
        filteredJson = [...myJson];
    } catch (err) {
        console.log(err);
    }
}



// show the products in the DOM
function showResulte(array) {
    // delete all products;
    resultCards.innerHTML = "";

    array.forEach(product => {

        let productContainer = document.createElement("div");
        productContainer.classList.add("card", "bg-dark", "border-0", "col-1", "mb-3");
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
        productPrice.classList.add("fs-6", "fw-lighter", "card-title");
        productPrice.innerHTML = `${product.price} €`;

        let productDes = document.createElement("p");
        productDes.classList.add("card-text");
        productDes.innerHTML = product.description;

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("d-flex", "justify-content-between");

        let detailBtn = document.createElement("a");
        detailBtn.href = `/product-page/product.html?id=${product._id}`
        detailBtn.target = "_blank";
        detailBtn.classList.add("btn-primary", "btn");
        detailBtn.innerHTML = "Product details";

        let cartBtn = document.createElement("button");
        cartBtn.classList.add("btn-success", "btn");

        cartBtn.addEventListener("click", () => {
            addToCart(product);
        })

        let cartBtnTxt = document.createElement("i");
        cartBtnTxt.classList.add("fa-shopping-cart", "fas");

        productContainer.appendChild(productImg);
        productContainer.appendChild(productInfo);
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productDes);
        productInfo.appendChild(btnContainer);
        btnContainer.appendChild(detailBtn);
        cartBtn.appendChild(cartBtnTxt);
        btnContainer.appendChild(cartBtn);

        resultCards.appendChild(productContainer);

    });
};


// search function (Search by name or brand):
document.getElementById("search-btn").addEventListener("click", filterFunction);

function filterFunction() {
    let searchValue = document.getElementById("search-input").value;
    let filterResult = filteredJson.filter((product) => {
        if (product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchValue.toLowerCase())) {
            return product;
        }
    })
    showResulte(filterResult);
};


// new collection function (search for products that have been uploaded in the last week):
document.getElementById("new-collection-btn").addEventListener("click", filterNewCollection);

function filterNewCollection() {
    let filterResult = filteredJson.filter((product) => {
        if ((new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24) < 7) {
            return product;
        }
    })
    showResulte(filterResult);
};

// add products in the cart to the local storage
function addToCart(productObject) {
    let cartItems = [];
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
    };
    cartItems.push(productObject);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(localStorage.getItem('cartItems'));
};