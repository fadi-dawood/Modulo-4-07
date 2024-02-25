// the list/table of the products
let productTable = document.getElementById("product-list");

// the id of the product to be modified in a Put call:
let idProductToEdit = "";

// Endpoint:
let urlPoint = "https://striveschool-api.herokuapp.com/api/product/";


// Upload a new product:
document.getElementById("upload-product-btn").addEventListener("click", () => { preparePayload() });


// load all products in the table when the page is loaded
window.onload = getCall();


// prepare the payload, control input fields and make a "post" call to add a new product or a "put" call to modify one:
function preparePayload(id = "") {
    //  the values of the user inputs (input form values)
    let productName = document.getElementById("product-name").value;
    let productBrand = document.getElementById("product-brand").value;
    let productPrice = document.getElementById("product-price").value;
    let productURL = document.getElementById("product-URL").value;
    let productDescription = document.getElementById("product-description").value;

    // Input labels:
    let productNameLabel = document.getElementById("product-name-label");
    let productBrandLabel = document.getElementById("product-brand-label");
    let productPriceLabel = document.getElementById("product-price-label");
    let productURLLabel = document.getElementById("product-URL-label");
    let productDescriptionLabel = document.getElementById("product-description-label");

    // control of the compilation of all inputs:
    if (productName && productBrand && productPrice && productURL && productDescription) {
        let payloadBody = {
            "name": productName,
            "description": productDescription,
            "brand": productBrand,
            "imageUrl": productURL,
            "price": productPrice
        };

        // Making tha calls:
        // 1- for post call:
        if (!id) {
            addNewProduct(payloadBody);
            emptyForm();
        };
        // 2- for put call:
        if (id) { putCall(id, payloadBody); };

    } else {
        // warn the user of unfilled fields:
        if (!productName) productNameLabel.classList.add("red-txt");
        if (!productBrand) productBrandLabel.classList.add("red-txt");
        if (!productPrice) productPriceLabel.classList.add("red-txt");
        if (!productURL) productURLLabel.classList.add("red-txt");
        if (!productDescription) productDescriptionLabel.classList.add("red-txt");
        document.querySelector("form > p").classList.add("red-txt");

        // delete the warning after 5 sec:
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


// HTTP Post (Send the product to the server):
async function addNewProduct(payload) {
    try {
        const response = await fetch(urlPoint,
            {
                method: "POST", body: JSON.stringify(payload),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });
        await getCall();
    } catch (err) {
        console.log(`Error number : ${err}`);
    };
};


// HTTP Get:
async function getCall(id = "") {
    // operations:
    // 1- without passing the id: "get" call to all products & start the function to load all the products in the page
    // 2- with the id: calls only one product and DOES NOT load the products in the list but passes json to a next function

    if (!id) endpoint = urlPoint;
    if (id) endpoint = urlPoint + id;
    try {
        const res = await fetch(endpoint,
            {
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });
        const jsonArray = await res.json();
        if (!id) await updateproductTable(jsonArray);
        if (id) return jsonArray;
    } catch (err) {
        console.log(`Error number : ${err}`);
    }
};





// Update the list of the products in the DOM:
async function updateproductTable(arrayOfProducts) {

    // delete old list:
    productTable.innerHTML = "";

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

        //funzionmento edit btn:
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
        productTable.appendChild(productRow);


        i += 1;
    });

    // Update the product count in the DOM:
    document.getElementById("product-count").innerText = i - 1;
};


// delete product call
async function removeCall(id) {
    try {
        await fetch(urlPoint + id,
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


// Edit product function (prepare the form to edit and send later)
async function editProduct(id) {
    try {
        // get the object to modify:
        let productToEdit = await getCall(id);

        // fill the form:
        document.getElementById("product-name").value = productToEdit.name;
        document.getElementById("product-brand").value = productToEdit.brand;
        document.getElementById("product-price").value = productToEdit.price;
        document.getElementById("product-URL").value = productToEdit.imageUrl;
        document.getElementById("product-description").value = productToEdit.description;

        // change the update/upload button:
        document.getElementById("update-product-btn").classList.remove("d-none");
        document.getElementById("upload-product-btn").classList.add("d-none");

        // change the appearance of the form:
        document.querySelector("#new-product-sec > h4").innerText = "Edit your product";
        document.querySelector("#new-product-sec > h4").classList.add("blue-txt");
        document.getElementById("product-name-label").classList.add("blue-txt");
        document.getElementById("product-brand-label").classList.add("blue-txt");
        document.getElementById("product-price-label").classList.add("blue-txt");
        document.getElementById("product-URL-label").classList.add("blue-txt");
        document.getElementById("product-description-label").classList.add("blue-txt");

        // go to the form:
        document.getElementById("product-name-label").scrollIntoView({ behavior: "smooth" });

        // pass the id of the product to be modified to a general variable
        idProductToEdit = id;

    } catch (err) {
        console.log(err);
    }
};


// when clicking the update button (update an existing product):

document.getElementById("update-product-btn").addEventListener("click", () => {

    // prepare the payload
    preparePayload(idProductToEdit);

    // reset the update/upload button:
    document.getElementById("update-product-btn").classList.add("d-none");
    document.getElementById("upload-product-btn").classList.remove("d-none");

    // empty form:
    emptyForm();

    // reset the appearance of the form:
    document.querySelector("#new-product-sec > h4").innerText = "Add new product";
    document.querySelector("#new-product-sec > h4").classList.remove("blue-txt");
    document.getElementById("product-name-label").classList.remove("blue-txt");
    document.getElementById("product-brand-label").classList.remove("blue-txt");
    document.getElementById("product-price-label").classList.remove("blue-txt");
    document.getElementById("product-URL-label").classList.remove("blue-txt");
    document.getElementById("product-description-label").classList.remove("blue-txt");

    // go to the top of the page:
    document.body.scrollTop = document.documentElement.scrollTop = 0;
});


// Put call:
async function putCall(id, payloadBody) {
    try {
        await fetch(urlPoint + id,
            {
                body: JSON.stringify(payloadBody),
                method: 'put',
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
                }
            });
        await getCall();
    } catch (err) {
        console.log(err);
    }
}

// the empty form function
function emptyForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-brand").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-URL").value = "";
    document.getElementById("product-description").value = "";
}