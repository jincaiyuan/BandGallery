function addLoadEvent(func){
    var oldLoad = window.onload;
    if(typeof window.onload != "function"){
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

//For this function I need to do some research
function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    if(!elem){
        return false;
    }
    if(elem.movement) {
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y){
        return true;
    }
    if(xpos < final_x){
        var dist = Math.ceil((final_x - xpos)/10);
        xpos += dist;
    }
    if(xpos > final_x){
        var dist = Math.ceil((xpos - final_x)/10);
        xpos -= dist;
    }
    if(ypos < final_y){
        var dist = Math.ceil((final_y - ypos)/10);
        ypos += dist;
    }
    if(ypos > final_y){
        var dist = Math.ceil((ypos - final_y)/10);
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y
                + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
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

    var links = intro.getElementsByTagName("a");
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
}
addLoadEvent(prepareSlideshow);