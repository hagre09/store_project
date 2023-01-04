var args = api_getUriArgs()

var product_id = args["id"]

function api_getSingleProducts() {
    console.log(product_id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://fakestoreapi.com/products/${product_id}`);
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var product = JSON.parse(xhr.response);
            document.getElementById('image').setAttribute('src', product.image);
            document.getElementsByTagName("h1")[0].innerHTML = product.title;
            document.getElementById("price").innerHTML = "Price=" + product.price + "$";
            document.getElementById("description").innerHTML = product.description;
            var numberrating = product.rating.rate;
            numberrating = Math.round(numberrating);
            for (var i = 0; i < numberrating; i++) {
                document.getElementById("rating").innerHTML += '<i class="fa-sharp fa-solid fa-star"></i>'
            }
            for (var i = 0; i < 5 - numberrating; i++) {
                document.getElementById("rating").innerHTML += '<i class="fa-regular fa-star"></i>'
            }
        }
    })
}

api_getSingleProducts()