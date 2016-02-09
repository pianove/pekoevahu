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
