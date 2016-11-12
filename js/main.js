//On load load default content
$(document).ready(function(){
    initialSetup();
    console.log("ready");
});

var museum_data = "./museums.php";
var keywords_data = "./keyterms.php";
var image_data="./images/";


function initialSetup(){
  configureCarousel();
  loadMuseumInfo();
}

function configureCarousel(){
  $.getJSON(museum_data, function(data){
      /*optional stuff to do after success */
      var output ='';
      $(data.museums).each(function(index, value){
        if(index==0){
          output+='<div class="item active">';
        }
        else{
            output+='<div class="item">';
        }
          output += '<img src="' +image_data + value.images[index].url + '"'+' alt='+ value.museum_name +' />';
          output+= '<div class="container capContent">';
          output+= '<div class="carousel-caption" id="'+index+'">';
          output+= '<h1>Example 2</h1>';
          output+= '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
          output+= '</div>';
          output+= '</div>';
          output+= '</div>';

      });
      $('.carousel-inner').empty().append(output);
  });

}


function loadMuseumInfo(){
  $.getJSON(museum_data, function(data){
    var output ='';

      $(data.museums).each(function(index, value){
          output+='<h1>'+value.museum_name+'</h1>';
          output+='<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
          $('#'+index).empty().append(output);
          output="";
      });

  });

}
