 <?php


 $email_to = "coach@pekoeva.hu";

 $email_subject = "Uzenet / Message from pekoeva.hu visitor";

  $email_message = "Meg egy kedves erdeklodo! Uzenet az alabbi adatokkal.\n";

 $first_name = $_REQUEST['first_name']; // not required

   $last_name = $_REQUEST['last_name']; // required

     $org_name = $_REQUEST['org_name']; // not required

    $email_from = $_REQUEST['email']; // required

    $message = $_REQUEST['message']; // required

    function clean_string($string) {

      $bad = array("content-type","bcc:","to:","cc:","href");

      return str_replace($bad,"",$string);

    }

    $email_message .= "Keresztneve: ".clean_string($first_name)."\n";

    $email_message .= "Vezetekneve: ".clean_string($last_name)."\n";

    $email_message .= "Email: ".clean_string($email_from)."\n";

    $email_message .= "Szervezet: ".clean_string($org_name)."\n";

    $email_message .= "Uzenet: ".clean_string($message)."\n";


// create email headers

$headers = 'From: '.$email_from."\r\n".

'Reply-To: '.$email_from."\r\n" .

'X-Mailer: PHP/' . phpversion();

@mail($email_to, $email_subject, $email_message, $headers);

?>
