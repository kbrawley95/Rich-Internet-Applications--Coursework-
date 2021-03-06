var previousContent=$( ".carousel-caption" ).html();
console.log(previousContent);

$('#search').keyup(function(){

  var searchTerm=$('#search').val();    //Assign value of search field
  var myExp = new RegExp(searchTerm, "i");

/*JQuery Process that compares the searchTerm with the data present in the .json array. If a match is deteched the content of the webpage is updated appropriately*/
  $.getJSON('./data/museums.json', function(data)
  {

    var output='<ul class="searchresults">';
    $.each(data, function(key, val){
      if(val.name.search(myExp)!=-1 || val.address.search(myExp)!=-1){
        output += '<li>';
        output += '<a href="'+val.website+'">' + val.name +'</a>';
        output += '<p>'+val.address+'</p>';
        output += '</li>';
      }
    });
    output+='</ul>';
    for (int i)
    $('.carousel-inner').html(output);
  });



})

function loadResults(){
  $.getJSON('./data/museums.json', function(data)
  {
    var output='<div class="searchresults">';
    $.each(data, function(key, val){
        output += '<div class="museum-item">';
        output += '<a href="'+val.website+'">' + val.name +'</a>';
        output += '<a href="fuck this"></a>';
          output += '<div class="museum-image">'
          output += '<img src="./images/museum.png">';
          output += '</div>';
        output += '<p>'+val.address+'</p>';
        output += '</div>';
    });
    output+='</div>';
    $('.carousel-caption').html(output);
  });
}
