//var menuLink = [
//  "eva-peko-coach-trainer-consultant.html",
//  "eva-peko-client-testimonials.html",
//  "eva-peko-private-coaching.html",
//  "eva-peko-coaching-consulting-services-for-corporates.html",
//  "eva-peko-background.html",
//  "index.html",
//  "peko-eva-rolam-mondtak.html",
//  "peko-eva-coaching-maganszemelyeknek.html",
//  "peko-eva-coaching-tanacsadas-szervezeteknek.html",
//  "peko-eva-kepzettseg.html"
//];

//Add class active to the menu item which is selected
$(function() {
  var el = $(".menu-top-header-nav ul li a");
  var i = 0;
  var href = document.location.href;
  var htmlFileName = href.substr(href.lastIndexOf('/') + 1);
  if (htmlFileName === "") {
    $(el[0]).addClass("active");
    return;
  }
  if (el === null) {
    return;
  }
  else
    for (i; i<el.length; i ++) {
      var link =  $(el[i]).attr("href");
      if (link.match(htmlFileName)){
        $(el[i]).addClass("active");
      }
      else
      $(el[i]).removeClass("active");
    }
});
