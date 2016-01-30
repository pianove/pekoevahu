<?php

if(isset($_POST['submit'])) {



    // EDIT THE 2 LINES BELOW AS REQUIRED

    $email_to = "eniko.pianovszky@gmail.com";

    $email_subject = "Üzenet / Message from pekoeva.hu visitor";





    function died($error) {

        // your error code can go here

       /* echo "Sajnálom. Az üzenetét nem sikerült elküldenie.<br />I am very sorry, but there were error(s) found with the delivery of your message. <br /><br /> ";
*/
       /* echo "Az alábbi hibaüzenet a sikertelen küldés oka: These errors appear below:<br /><br />";*/

//        echo $error."<br /><br />";

       /* echo "Kérem, térjen vissza és javítsa a hibás vagy hiányos adatokat.<br /> Please go back and fix these errors. <br /><br />";*/


       $error_long_message = "";
        $error_long_message .= "Sajnálom. Az üzenetét nem sikerült elküldenie.<br />I am very sorry, but there were error(s) found with the delivery of your message. <br /><br /> Az alábbi hibaüzenet a sikertelen küldés oka: These errors appear below:<br /><br />" ;

        $error_long_message .= $error;
        $error_long_message .= "<br /><br />Kérem, térjen vissza és küldje el újra üzenetét.<br /> Please go back and fix these errors.";

        echo $error_long_message."<br /><br />";


        $error_long_message_js = "";
        $error_long_message_js .= "Sajnálom. Az üzenetét nem sikerült elküldenie.</br>I am very sorry, but there were error(s) found with the delivery of your message. </br></br> Az alábbi hibaüzenet a sikertelen küldés oka: These errors appear below:</br></br>" ;

        $error_long_message_js .= $error;
        $error_long_message_js .= "<br /><br />Kérem, térjen vissza és küldje el újra üzenetét.<br /> Please go back and fix these errors.";

//        error message appears in an alert window
     /*   ?>

<script>alert("<?php echo "$error_long_message_js";?>");</script>
<?php
*/
        die();
    }



    // validation expected data exists

    if(

//        !isset($_POST['first_name']) ||

        !isset($_POST['last_name']) ||

        !isset($_POST['email']) ||

//        !isset($_POST['org_name']) ||

        !isset($_POST['message'])

        //!isset($_POST['telephone']) ||

       // !isset($_POST['comments'])
        ) {

        died('Sajnálom, valami adat még hiányzik a sikeres küldéshez. <br /> We are sorry, but there appears to be a problem with the form you submitted.');

    }



    $first_name = $_POST['first_name']; // not required

   $last_name = $_POST['last_name']; // required

     $org_name = $_POST['org_name']; // not required

    $email_from = $_POST['email']; // required

    $message = $_POST['message']; // required

   // $telephone = $_POST['telephone']; // not required

   // $comments = $_POST['comments']; // required



    $error_message = "";

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {

    $error_message .= 'Nem érvényes email címet adott meg. Kérem javítsa.<br /> The Email Address you entered does not appear to be valid.<br />';

  }

    $string_exp = "/^[A-Za-z .'-]+$/";



//    if(!preg_match($string_exp,$first_name)) {
//
//    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
//
//  }
//
  if(!preg_match($string_exp,$last_name)) {

    $error_message .= 'A vezetéknév mezőben nem érvényes adatot adott meg. Kérem javítsa.<br /> The Last Name you entered does not appear to be valid.<br />';

  }

  if(strlen($message) < 2) {

    $error_message .= 'Kérem írjon üzenetet, így hatékonyabban tudok válaszolni Önnek.<br />The message you entered do not appear to be valid.<br />';

  }

  if(strlen($error_message) > 0) {

    died($error_message);

  }

    $email_message = "Még egy kedves érdeklődő! Üzenet az alábbi adatokkal.\n";



    function clean_string($string) {

      $bad = array("content-type","bcc:","to:","cc:","href");

      return str_replace($bad,"",$string);

    }





    $email_message .= "Keresztnév: ".clean_string($first_name)."\n";

    $email_message .= "Vezetéknév: ".clean_string($last_name)."\n";

    $email_message .= "Email: ".clean_string($email_from)."\n";

    $email_message .= "Szervezet: ".clean_string($org_name)."\n";

    $email_message .= "Üzenet: ".clean_string($message)."\n";

//    $email_message .= "Telephone: ".clean_string($telephone)."\n";
//
//    $email_message .= "Comments: ".clean_string($comments)."\n";





// create email headers

$headers = 'From: '.$email_from."\r\n".

'Reply-To: '.$email_from."\r\n" .

'X-Mailer: PHP/' . phpversion();

@mail($email_to, $email_subject, $email_message, $headers);

?>



<!-- include your own success html here -->


Köszönöm, hogy megtisztelt érdeklődésével! Hamarosan felveszem Önnel a kapcsolatot.
Thank you for contacting me. I will be in touch with you very soon.



<?php
}

?>
