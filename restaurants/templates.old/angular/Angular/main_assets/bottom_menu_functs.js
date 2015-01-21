/* @flow */
 var sf=document.getElementById("sf");
 var cont_sf=document.createElement("div");
 cont_sf.setAttribute("class","container");
 sf.appendChild(cont_sf);

 var row_sf=document.createElement("div");
 row_sf.setAttribute("class","row");
cont_sf.appendChild(row_sf);

createBottomMenu= function(clas,id,title,sub,img){
 var div=document.createElement("div");
 div.setAttribute("class",clas);
 div.setAttribute("id","flipbox"+id);
 div.setAttribute("onmouseenter","bigImg("+id+")");
 div.setAttribute("style","height:287px;border: 2px solid #16a085;");
 var ttl=document.createElement("h4");
 div.appendChild(ttl);
 var ttltxt= document.createTextNode(title);
 var par1=document.createElement("p");
 par1.setAttribute("class","centered");
 var a=document.createElement("a");
 a.setAttribute("href","#");
 par1.appendChild(a);
 var i =document.createElement("i");
 i.setAttribute("class",img);
 a.appendChild(i);

 var par2=document.createElement("p");
 par2.setAttribute("class","ml");
 var par2txt= document.createTextNode(sub);
 par2.appendChild(par2txt);

div.appendChild(par1);
div.appendChild(par2);

return div;

}




/*
 <div class="container">
                <div class="row">
                    <div class="col-lg-3 dg" id="flipbox1" onmouseenter="bigImg(1)" style="height:287px;border: 2px solid #16a085;">
                        <h4 class="ml">RESTAURANTES</h4>
                        <p class="centered"><a href="#"><i class="fa fa-user"></i></a></p>
                        <p class="ml">> Vê as tuas opções</p>
                    </div>
                    <div class="col-lg-3 lg" id="flipbox2" onmouseenter="bigImg(2)" onmouseout="normalImg(2)" style="height:287px">
                        <h4 class="ml">APONTAMENTOS</h4>
                        <p class="centered"><a href="#"><i class="fa fa-copy"></i></a></p>
                        <p class="ml">> Vê as tuas opções</p>
                    </div>
                    <div class="col-lg-3 dg" id="flipbox3" onmouseenter="bigImg(3)" onmouseout="normalImg(3)" style="height:287px">
                        <h4 class="ml">SERVIÇOS</h4>
                        <p class="centered"><a href="#"><i class="fa fa-cogs"></i></a></p>
                        <p class="ml">> Vê as tuas opções</p>
                    </div>
                    <div class="col-lg-3 lg" id="flipbox4" onmouseenter="bigImg(4)" onmouseout="normalImg(4)" style="height:287px">
                        <h4 class="ml">LOCALIZAÇÃO</h4>
                        <p class="centered"><a href="#"><i class="fa fa-map-marker"></i></a></p>
                        <p class="ml">> Vê as tuas opções</p>
                    </div>
                </div><!-- row -->
            </div><!-- container -->


            */