// var args= api_getUriArgs()
// var product_id = args["id"];


var x = []
for (var i = 0; i < localStorage.length; i++) {
    x[i] = localStorage.getItem(i)
}

var myids = [];
x.forEach((element) => {
    if (!myids.includes(element)) {
        myids.push(element);
    }
});


function test(id){
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://fakestoreapi.com/products/" + id )
    xhr.send()
    
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.response);

            var datainfo = JSON.parse(xhr.response)
            console.log(datainfo)
            // console.log(datainfo["title"], datainfo["price"])
            var pageContent = document.getElementById("content");
            var productImage = document.createElement("img")
            productImage.src = datainfo["image"]
            productImage.style.width = "300px"
            productImage.style.height = "300px"
            productImage.style.marginLeft = "50px"
            pageContent.appendChild(productImage)

            var productTitle = document.createElement("h3")
            productTitle.textContent = datainfo["title"]
            productTitle.style.marginLeft = "50px"
            pageContent.appendChild(productTitle)

            var productPrice = document.createElement("h4")
            productPrice.textContent = datainfo["price"] + "  EGP"
            productPrice.style.marginLeft = "50px"
            productPrice.style.marginBottom = "50px"
            pageContent.appendChild(productPrice)
        }

    }) 
}



for (var t = 0; t < myids.length; t++) {
    test(myids[t])
}
