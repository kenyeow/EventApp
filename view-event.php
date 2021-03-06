<?php
include_once 'header.php';

// $user = $_SESSION['eventtap_usr'];

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "event_app";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET['event_id'])){
  $event_id = $_GET['event_id'];
  $sql = "SELECT * FROM event WHERE event_id = '$event_id'";
  $results = mysqli_query($conn, $sql);
  while($event_data = mysqli_fetch_assoc($results)) {
    $event_title = $event_data['event_title'];
    $event_content = $event_data['event_content'];
    $event_start_date = $event_data['event_start_date'];
    $event_start_time = $event_data['event_start_time'];
    $event_end_date = $event_data['event_end_date'];
    $event_longitude = $event_data['event_longitude'];
    $event_latitude = $event_data['event_latitude'];
    $event_location = $event_data['location'];
    $event_ticket = $event_data['participant'];
    $event_organiser_id = $event_data['organizer_id'];
    $event_categories = $event_data['category'];
  }

  $sql2 = "SELECT * FROM gallery WHERE event_id = '$event_id'";
  $results2 = mysqli_query($conn, $sql2);
  $img_srcs = array();
  $img_alts = array();
  $img_caps = array();
  while($gallery_data = mysqli_fetch_assoc($results2)) {
    $img_srcs[] = $gallery_data['img_src'];
    $img_alts[] = $gallery_data['img_alt'];
    $img_caps[] = $gallery_data['img_cap'];
  }

  $sql3 = "SELECT * FROM organizer WHERE id = '$event_organiser_id'";
  $results3 = mysqli_query($conn, $sql3);
  while($organiser_data = mysqli_fetch_assoc($results3)) {
    $event_organiser_name = $organiser_data['name'];
    $event_organiser_email = $organiser_data['email'];
    $event_organiser_contact = $organiser_data['contact'];
  }
}

?>

<link rel="stylesheet" href="css/view-event.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<main>

  <div class="container">
    <div id="event-view">

      <div id="event-title">
        <h1><?php echo $event_title; ?></h1>
        <p id="event-datetime"></p>
        <p id="event-categories"></p>
      </div>

      <hr>

      <div id="event-detail">
        <h1>Event Details: </h1>
        <span><?php echo $event_content; ?></span>
      </div>

      <div id="event-organiser">
        <h1>Organised by: </h1>
        <p><i class="material-icons">contacts</i><span><?php echo $event_organiser_name; ?></span></p>
        <p><i class="material-icons">contact_mail</i><span><?php echo $event_organiser_contact; ?></span></p>
        <p><i class="material-icons">contact_phone</i><span><?php echo $event_organiser_email; ?></span></p>
      </div>

      <div id="event-location">
        <h1>Where: </h1>
        <p><?php echo $event_location; ?></p>
      </div>

      <div id="googleMap"></div>

      <!-- supporting images here-->
      <?php
      if (isset($img_srcs)){
        echo '<div id="event-img">';
        foreach ($img_srcs as $key => $value) {
          echo '<span><figure>';
          echo '<img src="' .$img_srcs[$key]. '" alt="' .$img_alts[$key]. '"/>';
          // echo '<figcaption style="font-size: 16px;">' .$img_caps[$key]. '</figcaption>';
          echo '</figure></span>';
        }
        echo '</div>';
      }
      ?>

      <!-- Check if tickets left -->
      <?php
      if ($event_ticket > 0) {
        echo '<button id="regBtn" value="Register">Register</button>';
        echo '<div class="modal-mask"></div>';
        echo '<div id="reg-modal" class="modal modal-medium">';
        echo '<div class="modal-header"><p>Register Information</p></div>';
        echo '<div class="modal-body">';

       // echo '<form id="form">';
        echo '<input type="hidden" id="event_id"/>';
        echo '<div class="form-input" id="reg-info">';
        echo '<label for="name" class="input-lbl">Name </label>';
        echo '<input type="text" class="event-input" id="name" required>';
        echo '</div>';
        echo '<div class="form-input" id="reg-info">';
        echo '<label for="reg-email" class="input-lbl">E-mail Address </label>';
        echo '<input type="email" class="event-input" id="reg-email" required/>';
        echo '</div>';
        echo '<div class="form-input" id="reg-info">';
        echo '<label for="phone" class="input-lbl">Contact Number </label>';
        echo '<input type="tel" class="event-input" id="phone" pattern="^\d{3}-\d{7}$" required/></label>';
        echo '</div>';

        echo '<br><br>';
        echo '<div class="modal-footer">';
        echo '<button id="reg-submit">Submit</button>';
        echo '<button class="modal-close">Close</button>';

       // echo '</form>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
      }
      else {
        echo '<div id="no-ticket">Sold Out!</div>';
      }
      ?>

    </div>

    <div class="modal-mask"></div>
    <div id="view-img-modal" class="modal modal-full">
      <div class="modal-body"></div>
    </div>
  </main>
  <script>
    var event_id = "<?php echo $event_id?>";
    var event_categories = "<?php echo $event_categories?>";
    var startdate = "<?php echo $event_start_date?>";
    var starttime = "<?php echo $event_start_time?>";
    var enddate = "<?php echo $event_end_date?>";
    var mylat = "<?php echo $event_latitude?>";
    var mylng = "<?php echo $event_longitude?>";
  </script>
  <script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.js"></script>
  <script type="text/javascript" src="js/view-event.js"></script>
  <script  type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWAtE05RIq6Wd1xmHsLd2BXbC2fd0xhs&callback=initMap"></script>

  <?php
  include_once 'footer.php';
  ?>
