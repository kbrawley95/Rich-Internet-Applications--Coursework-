
/* Page Setup
==================================================
*/
var museum_data = "./museums.php";
var keywords_data = "./keyterms.php";
var image_data="./images/";
var term_id="";

//On load load default content
$(document).ready(function(){
  console.log("ready");
  initialSetup();

});


function initialSetup(){
  configureCarousel();
  configureSearchTerms();
  $( "#search" ).empty();

}

function searchConfigureCarousel(newValue){
  var output ='';
  var indictator='';

  $.getJSON(museum_data, function(data){
      $(data.museums).each(function(index, value){
        if(index==0){
          output+='<div class="item active">';
        }
        else{
            output+='<div class="item">';
        }
          output += '<img src="' +image_data + newValue.images[index].url + '"'+' class="image-responsive" alt="'+ newValue.museum_name +' />';
          output+= '<div class="container capContent">';
          output+= '<div class="carousel-caption" id="'+index+'">';
          output+= '<h1><i>Refresh Page</i></h1>';
          output+= '</div>';
          output+= '</div>';
          output+= '</div>';

      });
      $('.carousel-inner').empty().append(output);
  });

    indictator+= '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="1" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="2" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="3" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="4" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="5" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="6" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="7" ></li>';
      $('.carousel-indicators').empty().append(indictator);
  loadMuseumInfo();
  displayMuseumPage(newValue, true);
}




function configureCarousel(selectedPage, newValue){
  var output ='';
  var indictator='';

  $.getJSON(museum_data, function(data){
      $(data.museums).each(function(index, value){
        if(index==0){
          output+='<div class="item active">';
        }
        else{
            output+='<div class="item">';
        }

        if(selectedPage==true)
        {
          output += '<img src="' +image_data + newValue.images[index].url + '"'+' class="image-responsive" alt="'+ newValue.museum_name +' />';
          output+= '<div class="container capContent">';
          output+= '<div class="carousel-caption" id="'+index+'">';
          output+= '<h1><i>Refresh Page</i></h1>';
          output+= '</div>';
          output+= '</div>';
          output+= '</div>';
        }
        else{
          output += '<img src="' +image_data + value.images[index].url + '"'+' class="image-responsive" alt="'+ value.museum_name +' />';
          output+= '<div class="container capContent">';
          output+= '<div class="carousel-caption" id="'+index+'">';
          output+= '<h1><i>Refresh Page</i></h1>';
          output+= '</div>';
          output+= '</div>';
          output+= '</div>';



        }

      });
      $('.carousel-inner').empty().append(output);
  });

  if(!selectedPage){

    indictator+= '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="1" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="2" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="3" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="4" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="5" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="6" ></li>';
    indictator+= '<li data-target="#myCarousel" data-slide-to="7" ></li>';
      $('.carousel-indicators').empty().append(indictator);
  }

  loadMuseumInfo();

}

function loadMuseumInfo(){

  $('.carousel').carousel({interval: 5000});

  $(document).on('mouseleave', '.carousel', function() {

      $(this).carousel('cycle');
  });

  var output ='';
  var terms=[];
  var ids=[];
  $.getJSON(museum_data, function(data){

    $(data.museums).each(function(index, value){
      terms[index]=value.museum_name;
      ids[index]=value.museum_id;
      console.log("JSON VALUE: "+value);
      var newValue=data.museums;

    //  console.log(terms);
      output+='<a href="'+value.website+'"><h1>'+value.museum_name+'</h1></a>';
      output+='<p>'+value.museum_description+'</p>';
      output+= '<button onClick="displayMuseumPage();">Learn More</button>';
      $('#'+index).empty().append(output);
      output="";

      $( "#search" ).autocomplete({
        source: terms,
        autoFocus: true,
        select: function( event, ui ) {
          jQuery.each(terms, function(index, item) {
              // do something with `item` (or `this` is also `item` if you like)
              if(terms[index]==ui.item.value){
                configureCarousel(true, newValue[index]);
                displayMuseumPage(newValue[index], true);
              }
          });
        }
      });

    });

  });

}
/* Page Specific Content Generation
==================================================
*/
function displayMuseumPage(newValue, isSelected){

  var output ='';
  var newLat;
  var newLong;
  console.log(newValue);

  $('.carousel').carousel({interval: false, pause: 'hover'});

  $(document).on('mouseleave', '.carousel', function() {

      $(this).carousel('pause');
  });


  $.getJSON(museum_data, function(data){
      /*optional stuff to do after success */
      $(data.museums).each(function(index, value){

        if(isSelected){
          value=newValue;
          //console.log(index);
        }
        newLat=parseFloat(value.lat);
        newLong=parseFloat(value.long);


        output +='<div class="page">';
        output += "<h1>" + value.museum_name + "</h1>";

        output += "<h6><a href='"+value.website+"'>"+value.website+"</a></h6>";

        output+="<hr/>";

        output += "<p>";
        output += "<h2>Description</h2>";
        output += value.museum_description;
        output += "</p>";

        output+="<hr/>";

        output += "<p>";
        output += "<h2>Address</h2>";
        output += value.address + "<br />";
        output += value.postcode;
        output += "</p>";

        output+="<hr/>";

        output += "<p>";
        output += "<h2>Opening Hours</h2>";
        output += "Monday: " + value.opening_hours.Monday + "<br />";
        output += "Tuesday: " + value.opening_hours.Tuesday + "<br />";
        output += "Wednesday: " + value.opening_hours.Wednesday + "<br />";
        output += "Thursday: " + value.opening_hours.Thursday + "<br />";
        output += "Friday: " + value.opening_hours.Friday + "<br />";
        output += "Saturday: " + value.opening_hours.Saturday + "<br />";
        output += "Sunday: " + value.opening_hours.Sunday + "<br />";
        output += "</p>";
        output += "<p>";


        output+="<hr/>";

        output += "<p>";
        output += "<h2>Map View</h2>";
        output +='<div class="outerMapDiv"><div id = "map_canvas'+index+'" class="googleMap" style="width: 80%;height: 400px;"></div></div>';
        output += "</p>";


        output+= '</div>';

        $('.carousel-caption').css({top: '10%', height :'100%'});
        $('#'+index).empty().append(output);

        initMap(newLat, newLong,index);
        output="";
      });
  });

}
/* Search Bar Filtering
==================================================
*/
function configureSearchTerms(){
  $.getJSON(keywords_data, function(data){
    var output="";

      /*optional stuff to do after success */
      $(data.keyterms).each(function(index, value){
        term_id=value.term_id;

        output+='<li class="dropdown-item" onClick="filterByTerm('+term_id+');" >'+value.term+'</button>';
        $('.dropdown-menu').empty().append(output);


      });
  });

}

function filterByTerm(id){
  var keyArray;
  var output="";
  var newValue;
  var targetMuseums=new Array();
  console.log("Hello!");
  $.getJSON(museum_data, function(data){

    output+= '<div class="container">';
    output+= '<div class="carousel-caption">';

      /*optional stuff to do after success */
      $(data.museums).each(function(index, value){
        term_id=id;
        keyArray=value.keyterms;
        for (i = 0; i < keyArray.length; i++) {

          if(term_id==keyArray[i]){
            targetMuseums.push(value);

          }

        }


        });


        for(i=0; i<targetMuseums.length; i++){
          newValue = targetMuseums[i];
          output+='<div class="col-lg-4">';
          output+='<h1>'+targetMuseums[i].museum_name+'</h1>';
          output+='<p>'+targetMuseums[i].museum_description+'</p>';
          output+= '<button id="catButton"">Learn More</button>';


          output+= '</div>';
        }

        output+= '</div>';
        output+= '</div>';

        $('.carousel-inner').empty().append(output);
        $( "catButton" ).on( "click", searchConfigureCarousel(newValue));

      });


}

/* Google Map Implementation
==================================================
*/

function initMap(newLat, newLong,index){


  var uluru={lat: newLat, lng: newLong};
  console.log(uluru);
  var map=new google.maps.Map(document.getElementById('map_canvas'+index),{
    zoom: 15,
    center: uluru
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

}
