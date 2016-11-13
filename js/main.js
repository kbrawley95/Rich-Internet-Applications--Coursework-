//On load load default content
$(document).ready(function(){
  console.log("ready");
    initialSetup();

});

var museum_data = "./museums.php";
var keywords_data = "./keyterms.php";
var image_data="./images/";
var term_id="";

function initialSetup(){
  configureCarousel();
  configureSearchTerms();

}

function configureCarousel(){
  var output ='';

  $.getJSON(museum_data, function(data){
      /*optional stuff to do after success */
      $(data.museums).each(function(index, value){
        if(index==0){
          output+='<div class="item active">';
        }
        else{
            output+='<div class="item">';
        }
          output += '<img src="' +image_data + value.images[index].url + '"'+' alt="'+ value.museum_name +' />';
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

  loadMuseumInfo();

}

function loadMuseumInfo(){
  var output ='';
  var terms=[];
  $.getJSON(museum_data, function(data){

    $(data.museums).each(function(index, value){

      terms[index]=value.museum_name;
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
                console.log("Alright, alright, alright");
              }
          });
        }
      });

    });

  });

}

function displayMuseumPage(newValue){

  var output ='';

  $.getJSON(museum_data, function(data){
      /*optional stuff to do after success */
      $(data.museums).each(function(index, value){
        //console.log(index);

        output+='<div class="page">';
        if(value.museum_name===newValue){
          output += "<h1>" + newValue+ "</h1>"
        }
        else
        {
          output += "<h1>" + value.museum_name + "</h1>";
        }
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
        output+= '</div>';

        output+="<br/>";
        output+="<br/>";

        output += '<button onClick="initialSetup();">Go Back</button>';
        $('.carousel-caption').css('top', '20%');
        $('#'+index).empty().append(output);

        output="";
      });
  });

}

function configureSearchTerms(){
  $.getJSON(keywords_data, function(data){
    var output="";

      /*optional stuff to do after success */
      $(data.keyterms).each(function(index, value){
        term_id=value.term_id;

        output+='<button class="dropdown-item" onClick="filterByTerm('+term_id+')">'+value.term+'</button>';
        $('.dropdown-menu').empty().append(output);



      });
  });




}
