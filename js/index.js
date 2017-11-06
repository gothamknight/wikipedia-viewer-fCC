$(document).ready(function() {
  //search icon button click
  $(".fa-search").on("click", function() {
    $("#random-page-div").fadeOut(200, function() {
      $("#input-div").show().animate({ width: 240 }, 500); //show.animate input-div
      $("input").animate({ width: 194 }, 500).focus(); //animate then focus input
      $(".fa-times").fadeIn(200); //make x button fadeIn
      $("#search-icon-div").hide(); //hide search-icon-div
    }); //fadeOut "view random article"
  }); //fa-search button

  //x button click
  $(".fa-times").on("click", function() {
    $("#list-div").html("");
    $("#title").animate({ marginTop: "40vh" }, 600);
    $(".fa-times").fadeOut(200); //x button fadeOut
    $("input").animate({ width: 0 }, 500).hide(400).val(""); //animate then hide input
    $("#input-div").animate({ width: 32 }, 500).fadeOut(200, function() {
      //decrease size of, and then fadeOut input-div
      $("#search-icon-div").fadeIn(100, function() {
        $("#random-page-div").fadeIn(600); //fadeIn "view random article"
      }); //search-icon-div fadeIn
    }); //input-div fadeOut
  }); //x button within input element click function

  var searchInput;
  var urlToSearch;

  //when "enter" is pressed...
  $("#input").on("keyup", function(event) {
    if (event.keyCode == 13) {
      searchInput = document.getElementById("input").value.split(" ").join("+"); //retrieve text which is being searched for
     
      //console.log(searchInput);
      urlToSearch ="https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+searchInput;
      //console.log(urlToSearch);
      //console.log(event);
      $("#title").animate({ marginTop: 15 }, 700); //move title and search bar up
      
      //AJAX
      $.ajax({
        url: urlToSearch, //the url of the request
        type: "GET", //POST or GET
        dataType: "jsonp" //the type of data that is recieved
      })
        //if the jsonp is successfully retrieved
        .done(function(jsonp) {   
        if (jsonp[1][1]==undefined){return $("#list-div").html("<h3>no results - try a new search</h3>");}  
        $("#list-div").fadeOut(800,function(){//fadeOut of search results occurs first, if present
            $("#list-div").html("");//list-div is made empty, ready to be filled with new search result 
            for (var j = 0; j<jsonp[1].length; j++){
              $("#list-div").fadeIn(800).append(
                "<a href="+jsonp[3][j] + " target='_blank'>"+"<div class='each-list-div'>"+
                "<h2 class='heading'>"+jsonp[1][j]+"</h2>"+//list title
                "<p class='summary'>"+jsonp[2][j]+"</p>"+//summary
                "</div>"+//each-list-div
                "</a>"
              ); //$("#list-div").append
            }// for loop, var j 
          });//list-div fadeOut(line 48)
        }) //.done
      .fail(function(){
        $("#list-div").html("<h3>API request failed</h3>")
      });
    } //if (event.keyCode==13)
  }); //(#input).on(keyup...)
}); //document ready