//On load load default content
$(document).ready(function(){
    initialSetup();
    console.log("ready");
});

var museum_data = "./museums.php";
var keywords_data = "./keyterms.php";

var output ='<div class="museum_item"';

function initialSetup(){
  $.ajax({
    url: museum_data,
    type: 'GET',
    dataType: 'json',
    sucess: function(data){
      $.each(function(index, value){
          output += '<div id='+index+'>';
          output += '<img src="./images"' + value.images[index].url +' alt='+ value.museum_name +' />';
          output += '<div>';
          output += '<span>' + value.museum_type + '</span>';
          output += value.museum_name + '<br /><br />';
          output += value.museum_description;
          output += '</div>';
          output += '</div>';
      });
      output += '</div>';
      $('.carousel-caption').empty().append(output);
    }
  });

}
