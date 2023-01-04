document.getElementById("searchButton").onclick=function (evt) {
    evt.preventDefault();
    var inputVal = document.getElementById("searchInput").value;
    api_search(inputVal);
}

var currPage = api_currentpage()

if(currPage == "home"){
    api_loadPage("aside-slider");
    
    api_getCategories();
}else{
    api_loadPage("content");
}

if(currPage == "home"){
    api_getProducts()
    load_js("js/home.js")
}else if(currPage == "singleproduct"){
    load_css("css/malak_singleproduct.css")
    load_js("js/malak_singleproduct.js")
}else if (currPage == "cart"){
    load_css("css/osama_cart.css")
    load_js("js/osama_cart.js")
}else if (currPage == "login"){
    load_css("css/login.css")
    load_js("js/login.js")
}//else if (currPage == "register"){
//     load_css("")
//     load_js("")
// }


