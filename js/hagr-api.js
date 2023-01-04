var categoriesName = [];

function load_js(path) {
    var script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
 }

 function load_css(path) {
    var style = document.createElement('link');
    style.rel = "stylesheet"
    style.href= path;
    document.head.appendChild(style);
 }

function api_getDomain() {
    return location.href.split("?")[0];
}

function api_gifLoading(tag_id = "content", imgSrc = "images/loading.gif") {
    var pageContent = document.getElementById(tag_id);
    pageContent.innerHTML = `<img src="${imgSrc}" alt="" id="loading">`
}

function api_getUriArgs(uri = "") {
    if (uri == "")
        uri = decodeURI(location.href);

    var argsArr = uri.split("?")
    if (argsArr.length > 1) {
        argsArr = argsArr[1]
    } else {
        return [];
    }

    argsArr = argsArr.split("&")
    var args = {};
    for (arg of argsArr) {
        var argData = arg.split("=")
        args[argData[0]] = argData[1]
    }
    return args;
}


function api_currentpage() {
    var args = api_getUriArgs();
    if (args.hasOwnProperty("page") && args["page"] != "") {
        page = args["page"];
    } else {
        page = "home";
    }
    return page;
}

function api_loadPage(contentid = "content", page = "") {
    api_gifLoading(contentid)
    if (page == "") {
        page = api_currentpage()
    }
    
    var pageContent = document.getElementById(contentid);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `pages\\${page}.html`);
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var pageLoaded = xhr.response;
            pageContent.innerHTML = pageLoaded
        }
        if(page == "home"){
            load_js("js/hagr_slider.js")
        }
    })
}

function api_getCategories() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products/categories");
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var categories = JSON.parse(xhr.response);
            categoriesName = categories;
            var htmlStr = ``;
            for (var cat of categories) {
                htmlStr += `<li><a href="">${cat}</a></li>`;
            }
            document.getElementById("categories").innerHTML = htmlStr;
            document.querySelectorAll("#categories li a").forEach(function (elm) {
                elm.onclick=function (evt) {
                    evt.preventDefault();
                    api_getProducts(`https://fakestoreapi.com/products/category/${elm.textContent}`)
                }
            })
        }
    })
}

function api_search(inputVal="") {
    var catName = categoriesName.find((e)=>{return e.includes(inputVal)})
    if (!inputVal) {
        api_getProducts()
    }else{
        api_getProducts(`https://fakestoreapi.com/products/category/${catName}`)
    }
}

function api_getProducts(getUri = "https://fakestoreapi.com/products") {
    api_gifLoading("products")
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getUri);
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var products = JSON.parse(xhr.response);
            var htmlStr = `<section class="row1">`;
            var i = 1;
            for (var pro of products) {

                htmlStr += `<div class="product"> 
                                <a href="${api_getDomain()}?page=singleproduct&id=${pro.id}"><img src="${pro.image}" alt=""></a>
                                <p><a href="${api_getDomain()}?page=singleproduct&id=${pro.id}">${pro.title.slice(0, 50)}</p></a>
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
                                <button proid="${pro.id}" onclick="addToCard(${pro.id})">ADD TO CART</button>
                            </div>`;
                if (i % 4 == 0 && i > 3 && i / 4 < (products.length / 4)) {
                    htmlStr += `</section><section class="row1">`
                }
                i++;


            }
            htmlStr += `</section>`;
            if(products.length>0){
                document.getElementById("products").innerHTML = htmlStr;
            }else{
                document.getElementById("products").innerHTML = `<h2 style="text-align: center;margin: 50px auto;">No Search Reseults</h2>`;
            }
        }
    })
}




