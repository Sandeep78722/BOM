let container = document.getElementById("container");
let btnContainer = document.getElementById("btn-container");

async function getData() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP Request : ${response.statusText}`);
        }
        let result = await response.json();
        localStorage.setItem("products", JSON.stringify(result));
        createButton();
        displayData();
    } catch (err) {
        console.error(err);
    }
}

function createButton() {
    btnContainer.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = Array.from(new Set(products.map(obj => obj.category)));
        result.forEach(ele => {
            let button = document.createElement("button");
            button.className = "category-btn";
            button.textContent = ele;
            button.addEventListener("click", () => {
                filterData(ele);
            })
            btnContainer.appendChild(button);
        })
    }
}

function filterData(category) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = products.filter(obj => obj.category === category);
        displayData(result);
    }
}

function displayData(filterProducts) {
    container.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (filterProducts !== undefined) {
        products = filterProducts;
    }
    if (products.length === 0) {
        container.innerHTML = "<div class='no-data'>No data Available</div>";
    } else {
        products.forEach(obj => {
            let item = document.createElement("div");
            item.className = "product-item";
            item.innerHTML = `
            <div class="product-title">${obj.title}</div>
            <div>
                <img class='product-image' src=${obj.image}>
            </div>
                <p class="product-category">Category: ${obj.category}</p>
                <p class="product-description"><b>Description:</b> ${obj.description}</p>
                <p class="offer">bank offer</p>
            `;
            container.appendChild(item);
        })
    }
}

window.onload = getData;
