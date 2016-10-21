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
    $('.carousel-caption').html(output);
  });

})

function loadResults(){
  $.getJSON('./data/museums.json', function(data)
  {
    var output='<ul class="searchresults">';
    $.each(data, function(key, val){
        output += '<li>';
        output += '<a href="'+val.website+'">' + val.name +'</a>';
        output += '<p>'+val.address+'</p>';
        output += '</li>';
    });
    output+='</ul>';
    $('.carousel-caption').html(output);
  });
}
