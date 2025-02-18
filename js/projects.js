$(document).ready(function () {
  // Initial position of the line
  var $line = $(".vertical-line");
  var $window = $(window);

  // Function to update the line position on scroll
  function updateLinePosition() {
    var scrollPercentage =
      ($window.scrollTop() / ($("body").height() - $window.height())) * 100;
    var newHeight = (scrollPercentage / 100) * ($window.height() * 3.44);

    $line.css("height", newHeight + 20 + "px");
  }

  // Update the line position on page load
  updateLinePosition();

  // Update the line position on scroll
  $window.scroll(function () {
    updateLinePosition();
  });
});