var previousContent=$( ".carousel-caption" ).html();
console.log(previousContent);

$('#search').keyup(function(){

  var searchTerm=$('#search').val();
  var myExp = new RegExp(searchTerm, "i");

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
  }); //getJSON

})
