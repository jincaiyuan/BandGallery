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
            var linkText = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linkText);
        }
    }
}
addLoadEvent(highlightPage);


function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y){
        return true;
    }
    if(xpos < final_x){
        xpos++;
    }
    if(xpos > final_x){
        xpos--;
    }
    if(ypos < final_y){
        ypos++;
    }
    if(ypos > final_y){
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + xpos + "," + ypos
                + "," + interval + ")";
    movement = setTimeout(repeat, interval);
}

function prepareSlideshow(){
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "Preview images");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html") != -1){
                moveElement("preview", 0, 0, 5);
            }
            if(destination.indexOf("about.html") != -1){
                moveElement("preview", -150, 0, 5);
            }
            if(destination.indexOf("photos.html") != -1){
                moveElement("preview", -300, 0, 5);
            }
            if(destination.indexOf("live.html") != -1){
                moveElement("preview", -450, 0, 5);
            }
            if(destination.indexOf("contact.html") != -1){
                moveElement("preview", -600, 0, 5);
            }
        }
    }
    addLoadEvent(prepareSlideshow);
}