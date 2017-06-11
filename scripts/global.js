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
    if(!targetElement){
        return false;
    }
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
    if(!document.getElementById("intro")){
        return false;
    }
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    //This is a small pic to put slideshow pic.
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
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
}
addLoadEvent(prepareSlideshow);


/*************about page*****************/
function showSection(id){
    var sections = document.getElementsByTagName("section");
    if(sections.length == 0){
        return false;
    }
    for(var i = 0; i < sections.length; i++){
        if(sections[i].getAttribute("id") != id){
            sections[i].style.display = "none";
        }else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalNav(){
    var articles = document.getElementsByTagName("article");
    if(articles.length == 0){
        return false;
    }
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length == 0){
        return false;
    }
    var links = navs[0].getElementsByTagName("a");
    if(links.length == 0){
        return false;
    }
    for(var i = 0; i < links.length; i++){
        var linkHref = links[i].getAttribute("href");
        var sectionId = linkHref.split("#")[1];
        if(!document.getElementById(sectionId)){
            return false;
        }
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalNav);

//photos.html
//ToDo: check if id or element exists
function preparePlaceholder(){
    if(!document.getElementById("imagegallery")){
        return false;
    }
    var imagegallery = document.getElementById("imagegallery");
    //1. create a image node to place thumbnail image. Set attributes
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "My image gallery");
    //2. create a p node to place a text. Set attributes
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    //3. create a text node to set a text "Choose an image" under p node
    var descText = document.createTextNode("Choose an image");
    description.appendChild(descText);
    //4. insert image node and p node after #magegallery
    insertAfter(description, imagegallery);
    insertAfter(placeholder, description);
}

//whichPic: node <a>
function showPic(whichPic){
    //1. get href of whichPic
    if (!document.getElementById("placeholder")) {
        return false;
    }
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    //2. place the pic into placeholder
    placeholder.setAttribute("src", source);
    //3. set discription of p node's text to whichPic's title
    var title = whichPic.getAttribute("title");
    var description = document.getElementById("description");
    description.firstChild.nodeValue = title;
    return false;
}

function prepareGallery() {
    //1. reponse to onclick events of href in #imagegallery
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    if(links.length == 0) {
        return false;
    }
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//live.html
function stripeTables() {
    //1. get Table object
    if (!document.getElementsByTagName("table")) {
        return false;
    }
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var rows = tables[i].getElementsByTagName("tr");
        //2. addClass(rows[j], "odd");
        var odd = false;
        for (var j = 0; j < rows.length; j++) {
            if (odd) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
addLoadEvent(stripeTables);

function highlightRows() {
    //1. response rows[i].onmouseover
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i ++) {
        //2. addClass(rows[i], "highlight")
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }  
}
addLoadEvent(highlightRows);

//contact.html
