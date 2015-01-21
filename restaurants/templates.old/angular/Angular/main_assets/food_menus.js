/* @flow */
restaurants= document.getElementById("restinfo")

createRestaurant = function(text){
	var artc =document.createElement("article");
	var ref = document.createElement("a");
	var img = document.createElement("img");
	ref.appendChild(img);
	artc.appendChild(ref);
	var header = document.createElement("header");
	var para = document.createElement("p");
	var text = document.createTextNode(text);
	para.appendChild(text);
	
	artc.appendChild(header);
	artc.appendChild(para);

}


createRestaurant("HELLO!");

//element.insertBefore(para,child);