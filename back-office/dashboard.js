// the list of the products:
let productList = document.getElementById("product-list");

// Upload a new product:
document.getElementById("upload-product-btn").addEventListener("click", prepareNewProdunt);

// Endpoint:
let endpoint = "https://striveschool-api.herokuapp.com/api/product/";



// prepare the payload and control the new product input:
function prepareNewProdunt() {
    // Product's variables
    let productName = document.getElementById("product-name").value;
    let productBrand = document.getElementById("product-brand").value;
    let productPrice = document.getElementById("product-price").value;
    let productURL = document.getElementById("product-URL").value;
    let productDescription = document.getElementById("product-description").value;

    // Product's labels:
    let productNameLabel = document.getElementById("product-name-label");
    let productBrandLabel = document.getElementById("product-brand-label");
    let productPriceLabel = document.getElementById("product-price-label");
    let productURLLabel = document.getElementById("product-URL-label");
    let productDescriptionLabel = document.getElementById("product-description-label");

    // control of compilation of all input:
    if (productName && productBrand && productPrice && productURL && productDescription) {
        let payloadBody = {
            "name": productName,
            "description": productDescription,
            "brand": productBrand,
            "imageUrl": productURL,
            "price": productPrice
        };
        addNewProduct(payloadBody);
    } else {
        // avvisare l'utente dei campi non compilati:
        if (!productName) productNameLabel.classList.add("red-txt");
        if (!productBrand) productBrandLabel.classList.add("red-txt");
        if (!productPrice) productPriceLabel.classList.add("red-txt");
        if (!productURL) productURLLabel.classList.add("red-txt");
        if (!productDescription) productDescriptionLabel.classList.add("red-txt");
        document.querySelector("form > p").classList.add("red-txt");

        // cancellare l'aviso dopo 5 sec:
        setTimeout(() => {
            productNameLabel.classList.remove("red-txt");
            productBrandLabel.classList.remove("red-txt");
            productPriceLabel.classList.remove("red-txt");
            productURLLabel.classList.remove("red-txt");
            productDescriptionLabel.classList.remove("red-txt");
            document.querySelector("form > p").classList.remove("red-txt");
        }, 5000)
    };
};


// HTTP Post (Add the product to the server):
async function addNewProduct(payload) {
    try {
        await fetch(endpoint,
            {
                method: "POST", body: JSON.stringify(payload),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });
        await getCall();
    } catch (err) {
        //! farlo capire all'utente
        console.log(`Error number : ${err}`);
    };
};


// HTTP Get:
async function getCall(id = false) {
    if (id) endpoint = endpoint + id;
    try {
        const res = await fetch(endpoint,
            {
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });

        const jsonArray = await res.json();
        await updateProductList(jsonArray);
    } catch (err) {
        console.log(`Error number : ${err}`);
    }
};

window.onload = getCall();



// Update the list of the products:
async function updateProductList(arrayOfProducts) {

    console.log(arrayOfProducts);
    // delete old list:
    productList.innerHTML = "";

    // Number of products:
    let i = 1;

    // Create product's row:
    arrayOfProducts.forEach(product => {
        let productRow = document.createElement("tr");

        let productNum = document.createElement("td");
        productNum.innerText = i;
        productRow.appendChild(productNum);

        let productName = document.createElement("td");
        productName.innerText = product.name;
        productRow.appendChild(productName);

        let productPrice = document.createElement("td");
        productPrice.innerText = product.price + " €";
        productRow.appendChild(productPrice);

        // let productUrl = document.createElement("td");
        // productUrl.innerText = product.imageUrl;
        // productRow.appendChild(productUrl);

        // let productDes = document.createElement("td");
        // productDes.innerText = product.description;
        // productRow.appendChild(productDes);

        let productControl = document.createElement("td");
        productRow.appendChild(productControl);


        // edit btn
        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("btn", "btn-primary", "me-2");
        productControl.appendChild(editBtn);

        let editBtnIcon = document.createElement("i");
        editBtnIcon.classList.add("fas", "fa-pencil-alt", "me-1");
        editBtn.appendChild(editBtnIcon);

        let editBtnSpan = document.createElement("i");
        editBtnSpan.innerText = "Edit";
        editBtn.appendChild(editBtnSpan);

        //funzionmento delete btn:
        editBtn.addEventListener("click", () => {
            editProduct(product._id);
        });


        // delete btn
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("btn", "btn-danger");
        productControl.appendChild(deleteBtn);

        let deleteBtnIcon = document.createElement("i");
        deleteBtnIcon.classList.add("fas", "fa-trash-alt", "me-1");
        deleteBtn.appendChild(deleteBtnIcon);

        let deleteBtnSpan = document.createElement("i");
        deleteBtnSpan.innerText = "Delete";
        deleteBtn.appendChild(deleteBtnSpan);

        //funzionmento delete btn:
        deleteBtn.addEventListener("click", () => {
            removeCall(product._id);
        });


        // add to the DOM
        productList.appendChild(productRow);


        i += 1;
    });

    // Update the product count:
    document.getElementById("product-count").innerText = i - 1;
};



async function removeCall(id) {
    try {
        await fetch(endpoint + id,
            {
                method: 'delete',
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });
        await getCall();

    } catch (err) {
        console.log(`Error number : ${err}`);
    }
};

//! passare l'id solo una volta
async function editProduct(id) {

};