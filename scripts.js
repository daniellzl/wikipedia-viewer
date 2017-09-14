// when document is done loading
$(document).ready(function() {
  // save original state of the page to variable original
  var original = $("#container").clone();
  // focus on search bar
  $("#searchText").focus();

  // if search bar is submitted to
  $("#searchForm").submit(function() {
    // fade out
    $("#result").css("display", "none");
    // take search query from search box and append it to url to be queried
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + $("#searchText").val();
    // get json from wikipedia
    $.getJSON(url, function(json) {
      // introduce variable to store html to be added
      var html = "";
      if (json[1].length === 0) {
        html += '<p>No results found.</p>';
      } else {
        // create html to be added using results from search query
        for (var i = 0; i < json[1].length; i++) {
          html += '<a style="text-decoration:none" title="Open Wikipedia Article" href="' + json[3][i] + '"><div><h3>' + json[1][i] + '</h3></div><div class="text-left"><p>' + json[2][i] + '</p></div></a><br>';
        }
      }
      // add search results to page
      $("#result").html(html);
      // remove random article button
      $("#random").remove();
      // make search bar, title, and random article button move to top after search
      $("#container").removeClass("center");
      // focus on search bar
      $("#searchText").focus();
      // fade in wikipedia search
      $("#result").fadeIn(1500);
      return false;
    })
    // stop page from reloading after form is submitted
    return false;
  });
  
  // if title is clicked
  $("#title").click(function() {
    // return the page it its original state
    $("#container").replaceWith(original);
    return false;
  });
});
