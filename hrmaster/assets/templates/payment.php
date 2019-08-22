<!DOCTYPE html>
<html dir="ltr">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0"/>

	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title>Video Chat | Matrix Messengers</title>

    <link href="favicon.ico" rel="shortcut icon">
<link rel="stylesheet" type="text/css" href="css/bootstrap.css" /><link rel="stylesheet" type="text/css" href="css/roboto.css" media="all" />
	<link href="css/core.css" media="all" rel="stylesheet" type="text/css" />
	<link href="css/jquery-ui.css" rel="stylesheet" />
	<link href="css/services.css" rel="stylesheet" />
    <style type="text/css">
        .alert{
            -moz-border-radius: 0px;
            -webkit-border-radius: 0px;
            border-radius: 0px;
            font-size: 13px;
            margin-bottom: 0;
            margin-top: 0px;
            padding: 10px;
        }

        li.ui-corner-left{
            list-style-image: url("img/services/yes.png");
            text-align: left;
        }

        .basic_services li.ui-corner-left{
            list-style-image: url("img/services/warning.png");
            text-align: left;
        }
		
		#main-menu a {
			
			color: #5C7483 !important;

    font-size: 16px !important;

		}
		
			#main-menu a:hover {
			
			color:red !important;


		}
    </style>

    
<script type="text/javascript" src="../ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/jquery.flexslider.js"></script>
<script type="text/javascript" src="js/jquery.validate.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
            jQuery('.menu-link').click(function(){
                jQuery('#nav-menu').toggleClass("active");
                jQuery(this).toggleClass("active");
            });

            $(".div_services .btnSubmit").click(function(){
                var elem = $(this);
                var form = elem.parents("form");
                var activeService = form.find('input[name="service"]:checked');

                $(".div_services ul").css("height", 230);
                $(".alert").remove();

                if(activeService.length == 1){
                    form.submit();
                }
                else{
                    form.prev().css("height", 200);
                    form.prepend('<div class="alert alert-danger">Please select a plan</div>');
                }
            });


            $(".div_crownservices .btnSubmit").click(function(){
                var elem = $(this);
                var form = elem.parents("form");
                var activeService = form.find('input[name="service"]:checked');

                $(".div_crownservices ul").css("height", 165);
                $(".alert").remove();

                if(activeService.length == 1){
                    form.submit();
                }
                else{
                    form.prev().css("height", 130);
                    form.prepend('<div class="alert alert-danger">Please select a plan</div>');
                }
            });

            $(".div_roomservices .btnSubmit").click(function(){
                var elem = $(this);
                var form = elem.parents("form");
                var activeService = form.find('input[name="service"]:checked');

                $(".div_roomservices ul").css("height", 230);
                $(".alert").remove();

                if(activeService.length == 1){
                    form.submit();
                }
                else{
                    form.prev().css("height", 195);
                    form.prepend('<div class="alert alert-danger">Please select a plan</div>');
                }
            });

            $(".div_roomcrownservices .btnSubmit").click(function(){
                var elem = $(this);
                var form = elem.parents("form");
                var activeService = form.find('input[name="service"]:checked');

                $(".div_roomcrownservices ul").css("height", 165);
                $(".alert").remove();

                if(activeService.length == 1){
                    form.submit();
                }
                else{
                    form.prev().css("height", 130);
                    form.prepend('<div class="alert alert-danger">Please select a plan</div>');
                }
            });


            $(".div_specialservices .btnSubmit").click(function(){
                var elem = $(this);
                var form = elem.parents("form");
                var activeService = form.find('input[name="service"]:checked');

                $(".div_specialservices ul").css("height", 200);
                $(".alert").remove();

                if(activeService.length == 1){
                    form.submit();
                }
                else{
                    form.prev().css("height", 165);
                    form.prepend('<div class="alert alert-danger">Please select a plan</div>');
                }
            });

            /*$(".btnSubmit").click(function(){
                var elem = $(this);
                var form = elem.parents("form");
                var divServices = elem.parents(".service_block");
                var activeService = form.find('input[name="service"]:checked');
                $(".alert").remove();

                var ulHeight = divServices.find("ul").height();
                console.log(ulHeight);
                var errorHeight = ulHeight - 30;
                $(".div_services ul").css("height", ulHeight);

                if(activeService.length == 1){
                    form.submit();
                }
                else{
                    form.prev().css("height", errorHeight);
                    form.prepend('<div class="alert alert-danger">Please select a plan</div>');
                }
                //elem.parents("form").submit();
            });*/

        });
    </script>
</head>
<body class="html not-front not-logged-in no-sidebars page-node page-node- page-node-3 node-type-curated-page i18n-en js safari">
<div id="page-wrapper">
    <div id="header-wrapper">
        <div id="header">
    <div class="section clearfix">
        <a href="index.html" title="Home" rel="home" id="pt-logo"></a>
        <a href="#menu" class="menu-link"></a>
        <nav id="nav-menu" role="navigation">
            <h2>Main menu</h2>
            <ul id="main-menu" class="links inline clearfix">
                <li class="menu-559 first active"><a href="index.html">Home</a></li>
                <li class="menu-668 active-trail "><a href="/download/help" class="active-trail">Download</a></li>
                <li class="menu-667 "><a href="services">Services</a></li>
                <li class="menu-559 "><a href="features">Features</a></li>
                <li class="menu-560 last "><a href="https://matrixmessenger.helpsite.com/matrix-messenger-support">Contact us</a></li>
            </ul>
            <h2>Secondary menu</h2>
            <ul id="secondary-menu" class="links inline clearfix">
        </nav>

    </div>
  </div>    </div>
</div>

<?php  if(!$_REQUEST){  

header("location:services1");
} ?>
  <style>

  
  @media only screen 
and (max-width : 320px) {
#msform {
  width: auto;
  
}}


@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) {
#msform {
  width: auto;
  
}
}

/* Desktops and laptops ----------- */
@media only screen 
and (min-width : 1224px) {
#msform {
  width: 700px;
  
}
}

/* Large screens ----------- */
@media only screen 
and (min-width : 1824px) {
#msform {
  width: 700px;
  
}}



/*custom font*/
@import url(https://fonts.googleapis.com/css?family=Montserrat);

/*basic reset*/
* {margin: 0; padding: 0;}

html {
  height: 670px;;
  /*Image only BG fallback*/
  
  /*background = gradient + image pattern combo*/
   /*background: 
    linear-gradient(rgba(196, 102, 0, 0.6), rgba(155, 89, 182, 0.6));*/
}

body {
 
}
/*form styles*/
#msform {
 
  height: 389px;
  margin: 50px auto;
  text-align: center;
  position: relative;
}
#msform fieldset {
  background: white;
  border: 0 none;
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 20px 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;
  
  /*stacking fieldsets above each other*/
  position: relative;
}
/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
  display: none;
}
/*inputs*/
#msform input, #msform textarea {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  color: #2C3E50;
  font-size: 13px;
}
/*buttons*/
#msform .action-button {
  width: 100px;
  background: #27AE60;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
}
#msform .action-button:hover, #msform .action-button:focus {
  box-shadow: 0 0 0 2px white, 0 0 0 3px #27AE60;
}
/*headings*/
.fs-title {
     font-size: 22px;
    text-transform: uppercase;
    color: green;
    margin-bottom: 10px;
    font-weight: bold;
}
.fs-subtitle {
  font-weight: normal;
  font-size: 16px;
  color: black;
  margin-bottom: 20px;
}
/*progressbar*/
#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  /*CSS counters to number the steps*/
  counter-reset: step;
}
#progressbar li {
  list-style-type: none;
  color: black;
  text-transform: uppercase;
  font-size: 9px;
  width: 33.33%;
  float: left;
  position: relative;
}
#progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 20px;
  line-height: 20px;
  display: block;
  font-size: 10px;
  color: white;
  background: black;
  border-radius: 3px;
  margin: 0 auto 5px auto;
}
/*progressbar connectors*/
#progressbar li:after {
  content: '';
  width: 100%;
  height: 2px;
  background: black;
  position: absolute;
  left: -50%;
  top: 9px;
  z-index: -1; /*put it behind the numbers*/
}
#progressbar li:first-child:after {
  /*connector not needed before the first step*/
  content: none; 
}
/*marking active/completed steps green*/
/*The number of the step and the connector before it = green*/
#progressbar li.active:before,  #progressbar li.active:after{
  background: #27AE60;
  color: white;
}




</style>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">


<div align="center"><h1 style="font-size:25px;margin-top:50px;"><font color="white">Matrix Messenger <?php  echo $_REQUEST['service'];  ?> </font></h1></div>

	</center>
  <!-- multistep form -->
<form id="msform">
  <!-- progressbar -->
  <ul id="progressbar">
    <li class="active">Duration</li>
    <li>Nickname</li>
    <li>Confirmation</li>
  </ul>
  <!-- fieldsets -->
  <fieldset>
    <h2 class="fs-title">Service Name: <?php  echo $_REQUEST['service'];  ?></h2>
    <h3 class="fs-subtitle">You have selected <?php  echo $_REQUEST['service'];  ?> with the duration of <span style="color:red;font-size:18px;font-weight:bold;"><?php  echo $_REQUEST['month'];  ?></span>. Please click on the Next button to fill your information. </h3>
    <input type="button" name="next" class="next action-button" value="Next" />
   
    
  </fieldset>
  <fieldset>
    <h2 class="fs-title">Please fill the below information to complete the payment.</h2>

<center> <div class="">

        <label for="paypal" class="method paypal">
          <img src="img/paypal_logo.png"/>
          <div class="radio-input" style="padding:10px;">
            Pay <b style="color:red;font-size:18px;font-weight:bold;">$<?php  echo $_REQUEST['amount'];  ?> </b> USD  with PayPal&nbsp;<br>
          </div>
        </label> 
      </div></center>

      <div class="input-fields">
        <div class="column-1">
         <input type="text" name="your_name" id="your_name" placeholder="Please enter the nickname you are paying for" />
         <span id="invalidid" style="color:red;display:none;">Invalid Nickname </span>
		          <span id="correctid" style="color:green;display:none;"> Valid Nickname</span>

		 
        </div>
        <div class="column-2">
        <input type="text" name="email_address" id="email_address" placeholder="Please enter your email address" />
		         <span id="invalidemail" style="color:red;display:none;">Invalid Email </span>

        </div>
      </div>
    </div>	
    <input type="button" name="previous" class="previous action-button" value="Previous" />
	        <input type="button" name="next" class="next action-button" value="Next" />

  </fieldset>
  <fieldset>
    <h2 class="fs-title" style="font-weight:normal">Payment Confirmation. You are just one click away. Please click on the Buy Now button.</h2>
    <input type="button" name="previous" class="previous action-button" value="Previous" />
    <input type="button" name="submit" class="submit action-button" value="Buy Now" />
  </fieldset>
</form>
   <form  style="display:none;" class="form-horizontal" role="form" id="paypalForm" method="post" action="https://www.sandbox.paypal.com/cgi-bin/webscr">
    <input type="hidden" name="business" value="admin-facilitator@matrixmessenger.com">
    <input type="hidden" name="cmd" value="_xclick">
    <input type="hidden" name="credits" value="510">
    <input type="hidden" name="userid" value="1">
    <input type="hidden" name="cpp_header_image" value="">
    <input type="hidden" name="no_shipping" value="1">
    <input type="hidden" name="handling" value="0">
    <input type="hidden" name="cancel_return" id="cancel_return" value="https://www.matrixmessenger.com/payment_confirmation.php/?type=cancel&month=<?php echo $_REQUEST['month'];  ?>">
    <input type="hidden" name="return" id="return" value="https://www.matrixmessenger.com/payment_confirmation.php/?type=success&month=<?php echo $_REQUEST['month'];  ?>">
    <input type="hidden" class="form-control" name="amount" placeholder="Enter Amount" required="required" value="<?php  echo $_REQUEST['amount'];  ?>">
    <input type="hidden" class="form-control" name="quantity" placeholder="Enter Quantity" value="1" required="required">
    <input type="hidden" class="form-control" name="currency" placeholder="Enter Currency Type" value="USD" required="required">
    <input type="hidden" class="form-control" name="item_name" value="<?php  echo $_REQUEST['service'];  ?>">
    <input type="image"  src="https://www.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" id="paypal_submit" name="submit" alt="PayPal - The safer, easier way to pay online!">
    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">

</form>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js'></script>

  <script>
jQuery(document).ready(function(){
	jQuery(".submit").click(function(){
		jQuery('#paypal_submit').trigger('click');
       
	});
});

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
  if(animating) return false;
  animating = true;
  
  current_fs = $(this).parent();
  next_fs = $(this).parent().next();
  
  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
  
  //show the next fieldset
  next_fs.show(); 
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (now * 50)+"%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
      next_fs.css({'left': left, 'opacity': opacity});
    }, 
    duration: 800, 
    complete: function(){
      current_fs.hide();
      animating = false;
    }, 
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

$(".previous").click(function(){
  if(animating) return false;
  animating = true;
  
  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();
  
  //de-activate current step on progressbar
  $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  
  //show the previous fieldset
  previous_fs.show(); 
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1-now) * 50)+"%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'left': left});
      previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    }, 
    duration: 800, 
    complete: function(){
      current_fs.hide();
      animating = false;
    }, 
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

$(".submit").click(function(){
  return false;
})

  </script>

<!-- begin SnapEngage code -->
<script type="text/javascript">
  (function() {
    var se = document.createElement('script'); se.type = 'text/javascript'; se.async = true;
    se.src = '//storage.googleapis.com/code.snapengage.com/js/447e4844-d8e6-40e1-ba6e-b2ab90db4c82.js';
    var done = false;
    se.onload = se.onreadystatechange = function() {
      if (!done&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')) {
        done = true;
        /* Place your SnapEngage JS API code below */
        /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
      }
    };
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(se, s);
  })();
</script>
<!-- end SnapEngage code -->



        <div id="footer">
            <div class="section clearfix">
                  <div class="region region-footer">
    <div id="block-menu-menu-footer-links" class="block block-menu">

    <h2>Footer Links</h2>
  
  <div class="content">
    <ul class="menu"><li class="first expanded"><span class="nolink" class="nolink">Products</span><ul class="menu"><li class="first leaf"><a href="https://www.matrixmessenger.com/Setup.exe" id="footer-windows">Matrix Messenger for Windows</a></li>
</ul></li>
<li class="expanded"><span class="nolink" class="nolink">About Us</span><ul class="menu">
<li class="leaf"><a href="terms">Terms of Service</a></li>
<li class="last leaf"><a href="privacy">Privacy Policy</a></li>
</ul></li>
<li class="expanded"><span class="nolink" class="nolink">Social</span><ul class="menu"><li class="first leaf"><a href="https://www.facebook.com/MatrixMessenger">Facebook</a></li>
<li class="leaf"><a href="https://www.twitter.com/Matrix_Chat">Twitter</a></li>
</ul></li>
<li class="last expanded"><span class="nolink" class="nolink">Support</span><ul class="menu"><li class="first leaf"><a href="https://matrixmessenger.helpsite.com">Support Home</a></li>
<li class="leaf"><a href="https://matrixmessenger.helpsite.com">Contact Us</a></li>
<li class="last leaf"><a href="https://matrixmessenger.helpsite.com">Uninstall</a></li>
</ul></li>
</ul>  </div>
</div>
<div id="block-locale-language" class="block block-locale">

    <h2>Languages</h2>
  
  <div class="content">
    <div class="language-dropdown"><span class="valueholder">English</span><ul class="language-switcher-locale-url">
<li class="en active"><a href="home" class="language-link active" lang="en">English</a></li>
</ul></div>  </div>
            </div>
        </div>
    </div>
            <div class="section clearfix">
                <span class="copyright">Copyright &copy; 2019 Matrix Messenger. All rights reserved.</span>            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    setTimeout(function(){var a=document.createElement("script");
    var b=document.getElementsByTagName("script")[0];
    a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0003/6083.js?"+Math.floor(new Date().getTime()/3600000);
    a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
</script>
<!--Lotame Tracking Pixel for Index Exchange-->
<iframe style="position: absolute; left 0px; top: 0px; width:0px; height:0px; display: none;" src="../r.casalemedia.com/dea9f.gif?https://r.casalemedia.com/d.gif?u=271&amp;s=${aud_ids}"></iframe>
<!-- Start Quantcast tag -->
<script language="javascript">document.getElementsByTagName("html")[0].dir = "ltr";</script>
<script type="text/javascript" src="https://edge.quantserve.com/quant.js"></script>
<script type="text/javascript">_qacct="p-91mBChr87YHGg";/*quantserve();*/</script>
<noscript>
<a href="https://www.quantcast.com/p-91mBChr87YHGg" target="_blank"><img src="../pixel.quantserve.com/pixel/p-91mBChr87YHGg.gif" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/></a>
</noscript>
<!-- End Quantcast tag -->

<script>
	/*$(function() {
	    $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
	    $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
	});*/
</script>

<!-- begin SnapEngage code -->
<script type="text/javascript">
  (function() {
    var se = document.createElement('script'); se.type = 'text/javascript'; se.async = true;
    se.src = '//storage.googleapis.com/code.snapengage.com/js/447e4844-d8e6-40e1-ba6e-b2ab90db4c82.js';
    var done = false;
    se.onload = se.onreadystatechange = function() {
      if (!done&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')) {
        done = true;
        /* Place your SnapEngage JS API code below */
        /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
      }
    };
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(se, s);
  })();
</script>
<!-- end SnapEngage code -->

</body>

</html>


