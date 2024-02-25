// List of the products:
let productList = document.getElementById("product-list");

// Upload a new product:
document.getElementById("upload-product-btn").addEventListener("click", () => { prepareNewProduct() });

// Endpoint:
let urlPoint = "https://striveschool-api.herokuapp.com/api/product/";

// Prepare the payload and control the new product input:
function prepareNewProduct(id = "") {
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

    // Control of compilation of all input:
    if (productName && productBrand && productPrice && productURL && productDescription) {
        let payloadBody = {
            "name": productName,
            "description": productDescription,
            "brand": productBrand,
            "imageUrl": productURL,
            "price": productPrice
        };

        // For POST call:
        if (!id) {
            addNewProduct(payloadBody);
            emptyForm();
        }
        // For PUT call:
        else {
            putCall(id, payloadBody);
        }
    } else {
        // Notify the user of the fields not filled:
        if (!productName) productNameLabel.classList.add("red-txt");
        if (!productBrand) productBrandLabel.classList.add("red-txt");
        if (!productPrice) productPriceLabel.classList.add("red-txt");
        if (!productURL) productURLLabel.classList.add("red-txt");
        if (!productDescription) productDescriptionLabel.classList.add("red-txt");
        document.querySelector("form > p").classList.add("red-txt");

        // Remove the notification after 5 seconds:
        setTimeout(() => {
            productNameLabel.classList.remove("red-txt");
            productBrandLabel.classList.remove("red-txt");
            productPriceLabel.classList.remove("red-txt");
            productURLLabel.classList.remove("red-txt");
            productDescriptionLabel.classList.remove("red-txt");
            document.querySelector("form > p").classList.remove("red-txt");
        }, 5000);
    }
}

// HTTP Post (Add the product to the server):
async function addNewProduct(payload) {
    try {
        await fetch(urlPoint, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
            }
        });
        await getCall();
    } catch (err) {
        console.log(`Error number : ${err}`);
    }
}

// HTTP Get:
async function getCall(id = false) {
    // Function without passing the id: load the entire list of products
    // With id: call only one product and DO NOT LOAD the products in the list but pass json
    let endpoint;
    if (id) endpoint = urlPoint + id;
    else endpoint = urlPoint;

    try {
        const res = await fetch(endpoint, {
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWQ1YTljNDM3MDAwMTkzYzM3M2YiLCJpYXQiOjE3MDg0NTMyMTAsImV4cCI6MTcwOTY2MjgxMH0.ukQY1DUAwKBlvGGFxQAvaMmh4XoZTQApFmZTs68LhfY'
            }
        });

        const jsonArray = await res.json();
        if (!id) await updateProductList(jsonArray);
        else return jsonArray;
    } catch (err) {
        console.log(`Error number : ${err}`);
    }
}

// Update the list of the products:
async function updateProductList(arrayOfProducts) {
    // Delete old list:
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

        let productControl = document.createElement("td");
        productRow.appendChild(productControl);

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("btn", "btn-primary", "me-2");
        editBtn.innerHTML = '<i class="fas fa-pencil-alt me-1"></i>Edit';
        editBtn.addEventListener("click", () => { editProduct(product._id) });
        productControl.appendChild(editBtn);

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt me-1"></i>Delete';
        deleteBtn.addEventListener("click", () => { removeCall(product._id) });
        productControl.appendChild(deleteBtn);

        // Add to the DOM
        productList.appendChild(productRow);
        i++;
    });

    // Update the product count:
    document.getElementById("product-count").innerText = i - 1;
}

async function removeCall(id) {
    try {
        await fetch(urlPoint + id, {
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
}

async function editProduct(id) {
    try {
        // Get the object to be edited:
        let productToEdit = await getCall(id);

        // Fill the form:
        document.getElementById("product-name").value = productToEdit.name;
        document.getElementById("product-brand").value = productToEdit.brand;
        document.getElementById("product-price").value = productToEdit.price;
        document.getElementById("product-URL").value = productToEdit.imageUrl;
        document.getElementById("product-description").value = productToEdit.description;

        // Show the update button:
        document.getElementById("update-product-btn").classList.remove("d-none");
        document.getElementById("upload-product-btn").classList.add("d-none");

        // Change the form's appearance:
        document.querySelector("#new-product-sec > h4").innerText = "Edit your product";
        document.querySelectorAll(".form-label").forEach(label => label.classList.add("blue-txt"));

        // Add event listener to update button:
        document.getElementById("update-product-btn").addEventListener("click", () => {
            prepareNewProduct(id);
            document.getElementById("update-product-btn").classList.add("d-none");
            document.getElementById("upload-product-btn").classList.remove("d-none");
            emptyForm();
            document.querySelector("#new-product-sec > h4").innerText = "Add new product";
            document.querySelectorAll(".form-label").forEach(label => label.classList.remove("blue-txt"));
            window.scrollTo(0, 0);
        });

        // Scroll to the form:
        document.getElementById("product-name-label").scrollIntoView({ behavior: "smooth" });
    } catch (err) {
        console.log(err);
    }
}

async function putCall(id, payloadBody) {
    try {
        await fetch(urlPoint + id, {
            method: 'put',
            body: JSON.stringify(payloadBody),
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

function emptyForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-brand").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-URL").value = "";
    document.getElementById("product-description").value = "";
}

window.onload = getCall;
