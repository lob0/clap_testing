createMenuTitle = function(name,link){
    /*Creates menu title for toggle menu*/
    var h1=document.createElement("h1");
h1.setAttribute("class","logo");
var a=document.createElement("a");
a.setAttribute("href",link);
var text=document.createTextNode(name);
a.appendChild(text);
h1.appendChild(a);
return h1

}

createMenuOpt = function(name,link){
    /*Creates one menu option for toggle menu*/

var a=document.createElement("a");
a.setAttribute("href",link);
var text=document.createTextNode(name);
a.appendChild(text);
return a;

}

createMenuButn= function(clas){
    /*Creates a button for contact/social network for toggle menu*/

var fba=document.createElement("a");
fba.setAttribute("class",clas);
return fba;
}

insertCampusInfo = function(name,slogan){
    /*Inserts campus name and slogan on top of the page*/

var info= document.createElement("center");
 var n = document.createElement("h1");
 var ntxt=document.createTextNode(name);
var s= document.createElement("p");
 var stxt=document.createTextNode(slogan);
 n.appendChild(ntxt);
 s.appendChild(stxt);
info.appendChild(n);
info.appendChild(s);
return info
}

 insertLogo = function(img_path){
    /*Inserts logo on the top left side of the page*/
 var logo= document.createElement("center");
 var im=document.createElement("img");
 im.setAttribute("src",img_path);
 logo.appendChild(im);
 return logo;

 }


var main_div= document.getElementById("main_menu");

var nav= document.createElement("nav");
nav.setAttribute("class","menu");
nav.setAttribute("id","theMenu");
main_div.appendChild(nav);



/******
* MENU-WRAP
*******/

var divwrap= document.createElement("div");
divwrap.setAttribute("class","menu-wrap");
nav.appendChild(divwrap);


var i=document.createElement("i");
i.setAttribute("class","fa fa-arrow-right menu-close");
divwrap.appendChild(i);


var togle= document.createElement("div");
togle.setAttribute("id","menuToggle");

var i1=document.createElement("i");
i1.setAttribute("class","fa fa-bars");
togle.appendChild(i1);
nav.appendChild(togle);

 /* WELCOME SECTION */

 var hdwrap= document.getElementById("top_menu");
 var row1=document.createElement("div");
 row1.setAttribute("class","row mt");


 var col3=document.createElement("div");
 col3.setAttribute("class","col-lg-3");

 hdwrap.appendChild(row1);
 row1.appendChild(col3);



var col5=document.createElement("div");
col5.setAttribute("class","col-lg-5");
row1.appendChild(col5);


var col4=document.createElement("div");
col4.setAttribute("class","col-lg-4");
row1.appendChild(col4);
var par=document.createElement("p");
col4.appendChild(par);

par.setAttribute("class","pull-right");
var br=document.createElement("br");
par.appendChild(br);
var btn=document.createElement("button");
br.appendChild(btn);
btn.setAttribute("type", "button");
btn.setAttribute("class", "btn btn-green");