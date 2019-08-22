    <?php 
        ini_set( 'display_errors', 1 );
        error_reporting( E_ALL );
        $from = "no-reply@matrixmessenger.com";
        $to =   "officialmatrixmessenger@gmail.com";
        $subject = "PHP Mail Test script";
        $message = "This is a test to check the PHP Mail functionality";
        $headers = "From:" . $from;
        $mailsent =  mail($to,$subject,$message, $headers);
       if($mailsent){
        echo "Test email sent";
       }else{
         echo "Email not sent";
       }
    ?>