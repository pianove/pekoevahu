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

/*
 Copyright 2014 Google Inc. All rights reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/*
 * For more information on this file, see http://www.cookiechoices.org/
 */

(function(window) {

  if (!!window.cookieChoices) {
    return window.cookieChoices;
  }

  var document = window.document;
  // IE8 does not support textContent, so we should fallback to innerText.
  var supportsTextContent = 'textContent' in document.body;

  var cookieChoices = (function() {

    var cookieName = 'displayCookieConsent';
    var cookieConsentId = 'cookieChoiceInfo';
    var divClass = 'cookie-choices-info';
    var innerDivClass = 'cookie-choices-inner';
    var textSpan = 'cookie-choices-text';
    var buttonsClass = 'cookie-choices-buttons';
    var buttonClass = 'cookie-choices-button';
    var singletonClass = 'singleton-element';
    var dismissLinkId = 'cookieChoiceDismiss';

    function _createHeaderElement(cookieText, dismissText, linkText, linkHref) {
      var cookieInnerElement = document.createElement('div');
      cookieInnerElement.className = innerDivClass;
      cookieInnerElement.appendChild(_createConsentText(cookieText));

      var buttonsElement = document.createElement('span');
      buttonsElement.className = buttonsClass;
      cookieInnerElement.appendChild(buttonsElement);

      if (!!linkText && !!linkHref) {
        buttonsElement.appendChild(_createInformationLink(linkText, linkHref));
      }

      buttonsElement.appendChild(_createDismissLink(dismissText));

      var cookieConsentElement = document.createElement('div');
      cookieConsentElement.id = cookieConsentId;
      cookieConsentElement.className = divClass + ' ' + singletonClass;
      cookieConsentElement.appendChild(cookieInnerElement);
      return cookieConsentElement;
    }

    function _createStyleElement() {
      var style = document.createElement('style');
      style.className = singletonClass;
      style.type = 'text/css';
      _setElementText(style,
          '.' + divClass + ' { ' +
              'position:fixed;width:100%;background-color:#666;margin:0;' +
              'left:0;bottom:0;padding:0;z-index:4000;text-align:center;' +
              'color:#fff;line-height:140%;padding:5px 0;' +
              'font-family:roboto,Arial;background-color:rgba(85, 85, 85,0.7); } ' +
          '.' + divClass + ' .' + innerDivClass + ' { ' +
              'position:relative;width:initial;margin:0;left:0;top:0; } ' +
          '.' + divClass + ' .' + textSpan + ' { ' +
              'display:inline-block;vertical-align:middle;font-size:12px;' +
              'margin:0px 0px;color:#ccc;max-width:800px;' +
              'text-align:left; }' +
          '.' + divClass + ' .' + buttonsClass + ' { ' +
              'display:inline-block;vertical-align:middle;' +
              'white-space:nowrap;margin:0 0px;}' +
          '.' + divClass + ' .' + buttonClass + ':hover { ' +
              ' color: #333; } ' +
          '.' + divClass + ' .' + buttonClass + ' { ' +
              'font-weight:bold;text-transform:none;' +
              'white-space:nowrap;' +
              'background: #e3e3e3;' +
              'border: 1px solid #bbb;color: #333;' +
              'margin-left:8px;padding:0 6px; ' +
              'text-decoration:none;' +
              'border-radius: 5px;font-size:12px;}');
      document.getElementsByTagName('head')[0].appendChild(style);
    }

    function _setElementText(element, text) {
      if (supportsTextContent) {
        element.textContent = text;
      } else {
        element.innerText = text;
      }
    }

    function _createConsentText(cookieText) {
      var consentText = document.createElement('span');
      _setElementText(consentText, cookieText);
      consentText.className = textSpan;
      return consentText;
    }

    function _createDismissLink(dismissText) {
      var dismissLink = document.createElement('a');
      _setElementText(dismissLink, dismissText);
      dismissLink.id = dismissLinkId;
      dismissLink.href = '#';
      dismissLink.className = buttonClass;
      return dismissLink;
    }

    function _createInformationLink(linkText, linkHref) {
      var infoLink = document.createElement('a');
      _setElementText(infoLink, linkText);
      infoLink.name = 'modal';
      infoLink.href = linkHref;
      infoLink.setAttribute('data-toggle','modal');
      //infoLink.target = '_blank';
      infoLink.className = buttonClass;
      return infoLink;
    }

    function _dismissLinkClick(e) {
      _saveUserPreference();
      _removeCookieConsent();
      e.stopPropagation && e.stopPropagation();
      e.cancelBubble = true;
      return false;
    }

    function _showCookieConsent(cookieText, dismissText, linkText, linkHref) {
      if (_shouldDisplayConsent()) {
        _removeCookieConsent();
        _createStyleElement();
        var consentElement =
            _createHeaderElement(cookieText, dismissText, linkText, linkHref);
        var fragment = document.createDocumentFragment();
        fragment.appendChild(consentElement);
        document.body.appendChild(fragment.cloneNode(true));
        document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
      }
    }

    function _removeCookieConsent() {
      var cookieChoiceElement = document.getElementById(cookieConsentId);
      if (cookieChoiceElement !== null) {
        cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
      }
    }

    function _saveUserPreference() {
      // Set the cookie expiry to one year after today.
      var expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      document.cookie = cookieName + '=y; expires=' + expiryDate.toGMTString();
    }

    function _shouldDisplayConsent() {
      // Display the header only if the cookie has not been set.
      return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
    }

    var exports = {};
    exports.showCookieConsentBar = _showCookieConsent;
    return exports;
  })();

  window.cookieChoices = cookieChoices;
  return cookieChoices;
})(this);

/*
 * jQuery EasIng v1.1.2 - http://gsgd.co.uk/sandbox/jquery.easIng.php
 *
 * Uses the built In easIng capabilities added In jQuery 1.1
 * to offer multiple easIng options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// t: current time, b: begInnIng value, c: change In value, d: duration

jQuery.extend( jQuery.easing,
{
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t===0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t===0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
		if (a < Math.abs(c)) { a=c; s=p/4; }
		else s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t===0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
		if (a < Math.abs(c)) { a=c; s=p/4; }
		else s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t===0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
		if (a < Math.abs(c)) { a=c; s=p/4; }
		else s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * 0.5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
});


/*
CREDIT TO https://gist.github.com/ajtroxell/6731408
*/


/*
jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
    }, "type the correct answer -_-");
*/

// validate contact form

$(function() {

    $('#success .close').click(function(){
        $("#success").css('display', 'none');
    });
    $('#contactform').validate({
        rules: {
            last_name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }

        },
        messages: {
            last_name: {
                required: "<span class= 'hun-txt'>Kérem, adja meg vezetéknevét.</span><span class= 'en-txt'> Please enter your last name.</span>",
                minlength: "<span class= 'hun-txt'>A vezetéknévnek min. 2 karakternek kell lennie. </span><span class= 'en-txt'>Your name must consist of at least 2 characters.</span>"
            },
            email: {
                required: "<span class= 'hun-txt'> Kérem, adja meg email címét. </span><span class= 'en-txt'> Please enter your email address.</span>",
                email: "<span class= 'hun-txt'>Kérem, email címét név@pelda.hu formátumban adja meg. </span><span class= 'en-txt'> Your email address must be in the format of name@domain.com.</span>"
            },
            message: {
                required: "<span class= 'hun-txt'>Kérem, írjon üzenetet.</span><span class= 'en-txt'>You have to write something to send this form.</span>",
                minlength: "<span class= 'hun-txt'>Ez nagyon rövid üzenet. Kérem, javítsa.</span><span class= 'en-txt'> Your message is too short. Please write more.</span>"
            }

        },
        errorElement : 'div',
        errorLabelContainer: '.error-msg',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).appendTo(error);

          } else {
            error.insertAfter(element);

          }
        },
        submitHandler: function(form) {
            // setup some local variables
        var $form = $(form);
        // let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");
        // serialize the data in the form
        var serializedData = $form.serialize();

        // let's disable the inputs for the duration of the ajax request
        $inputs.prop("disabled", true);

        // fire off the request to /form.php

        request = $.ajax({
            url: "process.php",
            type: "post",
            data: serializedData
        });

        // callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {
           $('#success').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button><span class="hun-txt">Üzenetét sikeresen elküldte. Köszönöm, hogy megtisztelt érdeklődésével! Hamarosan felveszem Önnel a kapcsolatot.</span><span class="en-txt">Your message has been sent successfully. Thank you for contacting me. I will be in touch with you very soon.</span></div>');
            $form[0].reset();
        });

        // callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {

            // log the error to the console
//            console.error(
//                "The following error occured: " + textStatus, errorThrown);
        });

        // callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // reenable the inputs
            $inputs.prop("disabled", false);
        });

    }

        });

});
