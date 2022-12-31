

function api_getDomain() {
    return location.href.split("?")[0];
}

function api_gifLoading(tag_id="content", imgSrc="images/loading.gif") {
    var pageContent = document.getElementById(tag_id);
    pageContent.innerHTML = `<img src="${imgSrc}" alt="" id="loading">`
}

function api_getUriArgs(uri="") {
    if(uri == "")
        uri = decodeURI(location.href);

    var argsArr = uri.split("?")
    if(argsArr.length>1){
        argsArr = argsArr[1]
    }else{
        return [];
    }

    argsArr = argsArr.split("&")
    var args = {};
    for(arg of argsArr){
        var argData = arg.split("=")
        args[argData[0]] = argData[1]
    }
    return args;
}


function api_loadPage(page = "") {
    if(page == ""){
        var args = api_getUriArgs();
        if(args.hasOwnProperty("page") && args["page"] != ""){
            page = args["page"];
        }else{
            page = "home";
        }
    }

    
    var pageContent = document.getElementById("content");
    api_gifLoading()
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `pages\\${page}.html`);
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var pageLoaded = xhr.response;
            pageContent.innerHTML = pageLoaded
        }
    })
}



function api_getProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products");
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var products = JSON.parse(xhr.response);
            var htmlStr = `<section class="row1">`;
            var i = 1;
            for(var pro of products){
                
                htmlStr += `<div class="product">
                                <a href="${api_getDomain()}?page=singleproduct&id=${pro.id}"><img src="${pro.image}" alt=""></a>
                                <p><a href="${api_getDomain()}?page=singleproduct&id=${pro.id}">${pro.title.slice(0,50)}</p></a>
                                <div class="price">
                                    <span>${pro.price} EGP</span>
                                    <div class="rate">
                                        <i class="fa-sharp fa-solid fa-star"></i>
                                        <i class="fa-sharp fa-solid fa-star"></i>
                                        <i class="fa-sharp fa-solid fa-star"></i>
                                        <i class="fa-sharp fa-solid fa-star"></i>
                                        <i class="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                </div>
                                <p><a href="">Free Shipping</a></p>
                                <button proid="${pro.id}">ADD TO CART</button>
                            </div>`;
                    if(i%4==0 && i > 3 && i/4 < (products.length/4)){
                        htmlStr += `</section><section class="row1">`
                    }
                    i++;

                    
            }
            htmlStr += `</section>`;
            document.getElementById("products").innerHTML = htmlStr;
        }
    })
}




