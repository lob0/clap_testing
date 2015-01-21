/*
var port=document.getElementById("portfolio");


var container= document.createElement("div");
container.setAttribute("class","container");

port.appendChild(container);

var rowmt= document.createElement("div");
rowmt.setAttribute("class","row mt");

container.appendChild(rowmt);

var grid= document.createElement("ul");
grid.setAttribute("class","grid effect-2");
grid.setAttribute("id","grid");

rowmt.appendChild(grid);

createGridElem= function(imgpath,faded_text,search_link){


var grid_elem= document.createElement("li");
grid.appendChild(grid_elem);

var subdiv1= document.createElement("div");
subdiv1.setAttribute("class","portfolio-item graphic-design");

grid_elem.appendChild(subdiv1);

var subdiv2= document.createElement("div");
subdiv2.setAttribute("class","he-wrap tpl6");

subdiv1.appendChild(subdiv2);

var img= document.createElement("img");
img.setAttribute("src",imgpath);

subdiv2.appendChild(img);

var subdiv3= document.createElement("div");
subdiv3.setAttribute("class","he-view");

subdiv2.appendChild(subdiv3);

var subdiv4= document.createElement("div");
subdiv4.setAttribute("class","bg a0");
subdiv4.setAttribute("data-animate","fadeIn");

subdiv3.appendChild(subdiv4);

//Text when fadded


newline= createFadedText(faded_text);

subdiv4.appendChild(newline);

//Links when fadded

var search=createLinkButn("fa fa-search",search_link);
var link=createLinkButn("fa fa-link","#");

subdiv4.appendChild(search);
subdiv4.appendChild(link);

}

createFadedText = function(text){

var tex1= document.createElement("h3");
tex1.setAttribute("data-animate","fadeIn");
tex1.setAttribute("style","font-family: 'Raleway', sans-serif;font-weight: 700;");


var line1=document.createElement("u");
var tline1=document.createTextNode(text);
line1.appendChild(tline1);
tex1.appendChild(line1);

return tex1;

}

createLinkButn= function(kind,link){
var go = document.createElement("a");
go.setAttribute("class","dmbutton a2");
go.setAttribute("href",link);
go.setAttribute("data-animate","fadeInUp");
go.setAttribute("style","border: 1px solid #ffffff;");
var i=document.createElement("i");
i.setAttribute("class",kind);
go.appendChild(i);
return go;

}

*/


