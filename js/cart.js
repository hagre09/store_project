var myids = getCartidArr()


document.getElementById("countCart").innerHTML = myids.length;


function test(id) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://fakestoreapi.com/products/" + id)
    xhr.send()

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {


            var datainfo = JSON.parse(xhr.response)

            var pageContent = document.getElementById("content");
            var productImage = document.createElement("img")
            productImage.src = datainfo["image"]
            productImage.style.width = "300px"
            productImage.style.height = "300px"
            productImage.style.marginLeft = "50px"
            productImage.style.marginTop = "20px"
            pageContent.appendChild(productImage)

            var productTitle = document.createElement("h3")
            productTitle.textContent = datainfo["title"]
            productTitle.style.marginLeft = "50px"
            productTitle.style.width = "200px"
            pageContent.appendChild(productTitle)

            var productPrice = document.createElement("h4")
            productPrice.textContent = datainfo["price"] + "  $"
            productPrice.style.marginLeft = "50px"
            productPrice.style.marginBottom = "50px"
            productPrice.style.marginTop = "20px"
            productPrice.style.color = "blue"
            pageContent.appendChild(productPrice)



            var pieceCount = document.createElement("span")
            pieceCount.style.marginLeft = "40px"
            pieceCount.style.marginBottom = "70px"
            pieceCount.style.marginTop = "20px"
            pieceCount.style.color = "black"
            pieceCount.textContent = "pieces : "


            var productCount = document.createElement("input")
            productCount.style.color = "black"
            productCount.style.width = "40px"
            productCount.style.cursor = "pointer"

            productCount.type = "number"
            productCount.value = "1"

            productPrice.appendChild(pieceCount)
            productPrice.appendChild(productCount)

            var productRemove = document.createElement("a");
            productRemove.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            productPrice.appendChild(productRemove);
            productRemove.style.marginLeft = "30px"
            productRemove.style.fontSize = "30px"
            productRemove.style.color = "#ff9900"
            productRemove.onclick = function () {
                    productImage.remove()
                    productTitle.remove()
                    productPrice.remove()
                var cartIdsStr = localStorage.getItem("cartIdsStr").split(',');
                cartIdsStr = cartIdsStr.filter((c) => { return c != id });
                localStorage.setItem('cartIdsStr', cartIdsStr.join(','))

                setCartCount();
            }

        }



    })
}



for (var t = 0; t < myids.length; t++) {
    test(myids[t])
}



