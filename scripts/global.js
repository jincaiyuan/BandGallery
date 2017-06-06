function addLoadEvent(func){
    var oldLoad = window.onload;
    if(typeof Window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function() {
            oldLoad();
            func();
        }  
    }
}

function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(targetElement == parent.lastChild) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value){
    if(!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName = " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage() {
    var headers = document.getElementsByTagName("header");
    var navs = headers[0].getElementsByTagName("nav");
    var links = navs[0].getElementsByTagName("a");
    var linkUrl;
    for(var i = 0; i < links.length; i++){
        linkUrl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkUrl) != -1){
            addClass(links[i], "here");
        }
    }
}
addLoadEvent(highlightPage);