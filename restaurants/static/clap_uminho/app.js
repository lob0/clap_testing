var obj;
var maxPost=3;
var maxRow=3;
function load() {
  obj = JSON.parse( httpGet("http://193.136.19.86:8080/restaurants/main/"));
  var i;
  //addrow
  //for (i = 0; i <= atRow(obj.length); i++) {
  // addrow(i); 
  // alert(i);
  //}
  /*/addline
  for (i = 0; i <=atLine(obj.length); i++) {
  }
  //addblocks for visual effect
  
  */
  
  //alert(atRow(5)+"  "+atLine(5));
  alert("f "+ obj.length );
  //var x;
  document.getElementById("portfolio").innerHTML="";
  addrow(1);
  addrow(2);
  addPort(1,1,"fabio","/static/clap_uminho/main_assets/assets/img/restaurantes/griil.jpg","41.5577000","-8.3989270");
  addPort(2,2,"fabio","/static/clap_uminho/main_assets/assets/img/restaurantes/griil.jpg","41.5577000","-8.3989270");
  addPort(0,3,"fabio","/static/clap_uminho/main_assets/assets/img/restaurantes/griil.jpg","41.5577000","-8.3989270");
  //addBlockD(2);
  //addPort(2,4,"fabio","main_assets/assets/img/restaurantes/griil.jpg","41.5577000","-8.3989270");
  //addPort(2,5,"fabio","main_assets/assets/img/restaurantes/griil.jpg","41.5577000","-8.3989270");

}



//extra-extra
function atLine(x){
  var r =  x%maxPost;
  if (r>(x%maxPost)) return maxRow;
  else return x%maxPost;
}

function atRow(x){
  var r = (x-(x%maxRow))/maxRow;
  if (r>maxRow) return maxRow;
  else return (x-(x%maxRow))/maxRow;
}

//add coloca nos elementos

function addrow(id){
        document.getElementById("portfolio").innerHTML=document.getElementById("portfolio").innerHTML.concat(
            setrow(id)
        );
}


function addPort(idrow,id,nameRest,imageRest,lat,lon){
    document.getElementById("rowPortf"+idrow).innerHTML= document.getElementById("rowPortf"+idrow).innerHTML.concat( 
          setPort(id,nameRest,imageRest,lat,lon)
    );
    $('#panel'+id).hide()
}

//set cria elementos

function setPort(id,nameRest,imageRest,lat,lon){
return ""+setPortfBox(id,nameRest,imageRest,lat,lon) +"\n"+ setPortfBoxModal(id,nameRest);
}

function setrow(id){
return '\n                    <div class="row" id="rowPortf'+id+'">\
                     </div>\n';
}

function setPortfBox(id,nameRest,imageRest,lat,lon){

return '\n                        <div id="portfbox'+id+'" class="col-md-4">\
                            <div class="grid mask">\
                                <figure>\
                                    <img class="img-responsive" src="'+imageRest+'" alt="">\
                                        <figcaption>\
                                            <h5>'+nameRest.toLocaleUpperCase()+'</h5>\
                                            <a data-toggle="modal" href="#modal_'+id+'" class="btn btn-primary btn-lg" onclick="resizeMap('+id+','+lat+','+lon+')">Ver Mais</a>\
                                        </figcaption><!-- /figcaption -->\
                                    </figure><!-- /figure -->\
                                </div><!-- /grid-mask -->\
                            </div><!-- /col -->\n';
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function setPortfBoxModal(id,nameRest){
  nameRest=nameRest.toLowerCase();
  nameRest=nameRest.capitalize();
  
  
return '\n               <div class="modal fade" id="modal_'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                            <div class="modal-dialog">\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                        <h4 class="modal-title">'+nameRest+'</h4>\
                                    </div>\
                                    <div class="modal-body">\
                                        <h2>Ementa:</h2>\
                                        <li>Panados de Porco, com massa de feijão vermelho</li>\
                                        <li>Sopa de Legumes</li>\
                                        <li>Gelatina</li>\
                                        <!--MAP things-->\
                                        <div id="mapCont" class="container">\
                                          <div class="row">\
                                            <div id="panel'+id+'">\
                                              <p>\
                                                <h2>Event Descrition</h2>\
                                                <input id="pDescription'+id+'" style="width:550px" class="form-control round-form" type="text" name="Description" value="Small Description" maxlength="60">\
                                              </p>\
                                              <p>\
                                                <input type="button" value="Insert" onClick="panel_insert_action('+id+')" />\
                                                <input type="button"  value="cancel" onClick="panel_cancel_action('+id+')" />\
                                              </p>\
                                            </div> \
                                            <div id="map-canvas'+id+'"  style="width:550px; height:350px"class=""></div>\
                                          </div>\
                                        </div>\
                                        <!-- Map things-->\
                                    </div>\
                                    <div class="modal-footer">\
                                        <button type="button" class="btn btn-default" style="align:left"><a href="rest_ind_template.html">Detalhes Restaurante</a></button>\
                                        <button type="button" class="btn btn-default" data-dismiss="modal"><a>Fechar</a></button>\
                                    </div>\
                                </div><!-- /.modal-content -->\
                            </div><!-- /.modal-dialog -->\
                        </div><!-- /.modal -->\n';
                        }


//Block

function addBlock(row){
  document.getElementById("rowPortf"+row).innerHTML= document.getElementById("rowPortf"+row).innerHTML.concat( 
          '\n<div id="portfbox2" class="col-md-2" ></div>'
        );
}

function addBlockD(row){
  document.getElementById("rowPortf"+row).innerHTML= document.getElementById("rowPortf"+row).innerHTML.concat( 
          '\n<div id="portfbox2" class="col-md-4" ></div>'
        );
}
























/*
'               <div class="modal fade" id="modal_cantina" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                            <div class="modal-dialog">\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                        <h4 class="modal-title">Cantina</h4>\
                                    </div>\
                                    <div class="modal-body">\
                                        <h2>Ementa:</h2>\
                                        <li>Panados de Porco, com massa de feijão vermelho</li>\
                                        <li>Sopa de Legumes</li>\
                                        <li>Gelatina</li>\
                                        <!--MAP things-->\
                                        <div id="mapCont" class="container">\
                                          <div class="row">\
                                            <div id="panel1">\
                                              <script>$("#panel1").hide() </script>\
                                              <p>\
                                                <h2>Event Descrition</h2>\
                                                <input id="pDescription1" style="width:550px" class="form-control round-form" type="text" name="Description" value="Small Description" maxlength="60">\
                                              </p>\
                                              <p>\
                                                <input type="button" value="Insert" onClick="panel_insert_action(1)" />\
                                                <input type="button"  value="cancel" onClick="panel_cancel_action(1)" />\
                                              </p>\
                                            </div> \
                                            <div id="map-canvas1"  style="width:550px; height:350px"class=""></div>\
                                          </div>\
                                        </div>\
                                        <!-- Map things-->\
                                    </div>\
                                    <div class="modal-footer">\
                                        <button type="button" class="btn btn-default" style="align:left"><a href="rest_ind_template.html">Detalhes Restaurante</a></button>\
                                        <button type="button" class="btn btn-default" data-dismiss="modal"><a>Fechar</a></button>\
                                    </div>\
                                </div><!-- /.modal-content -->\
                            </div><!-- /.modal-dialog -->\
                        </div><!-- /.modal -->'





%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




'                        <div id="portfbox'+id+'" class="col-md-4">\
                            <div class="grid mask">\
                                <figure>\
                                    <img class="img-responsive" src="'+imageRest+'" alt="">\
                                        <figcaption>\
                                            <h5>'+nameRest+'</h5>\
                                            <a data-toggle="modal" href="#modal_griil" class="btn btn-primary btn-lg" onclick="resizeMap('+id+','+lat+','+lon+')">Ver Mais</a>\
                                        </figcaption><!-- /figcaption -->\
                                    </figure><!-- /figure -->\
                                </div><!-- /grid-mask -->\
                            </div><!-- /col -->'

*/


