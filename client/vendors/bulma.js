document.addEventListener('DOMContentLoaded', function () {

//======================================== | NAV BURGER | ====================================
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  //======================================== | DROP DOWN EVNTS | ====================================
  function toggleDropdown(elem){
    if(!elem.hasClass('is-active'))
      elem.addClass('is-active')
    else
      elem.removeClass('is-active')
  }

  $(document).on("click",".dropdown", function () {
    var elem = $(this)
    toggleDropdown(elem);
  });

  $(document).on("click",".dropdown-item", function () {
    var elem = $(this)
    elem.addClass('is-active').siblings().removeClass('is-active')
  });

});