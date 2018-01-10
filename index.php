<?php
  include_once 'header.php';

  DEFINE ("maxQuery", 8);
?>

<main>
  <section class="index-banner">
    <div class="vertical-center">
      <h1>Welcome to EventApp</h1>
      <h2>Find your next event here !</h2>
      <div class="search-container">
        <form action="" method="post">
          <input type="text" placeholder="Search for next event.." name="search"/>
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </div>
  </section>
  <div class="container">
    <section class="index-event-list">
      <h1>Events for you</h1>
      <div class="row">
        <div class="column">
          <div id="event-card">
            <h1> Lelong.my: Class 101</h1>
            <h2> Now Everybody Can Sell Online! (English)... </h2>
            <h3> (Kuala Lumpur, 6th Jan) </h3>
            <button type="submit" value="Register">Register</button>
          </div>
        </div>
        <div class="column">
          <div id="event-card">
            <h1> Lelong.my: Class 101 - Now Everybody Can Sell Online! (English)</h1>
            <h2> Now Everybody Can Sell Online! (English)... </h2>
            <h3> (Kuala Lumpur, 6th Jan) </h3>
            <button type="submit" value="Register">Register</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <div id="event-card">
            <h1> Lelong.my: Class 101 - Now Everybody Can Sell Online! (English)</h1>
            <h2> Now Everybody Can Sell Online! (English)... </h2>
            <h3> (Kuala Lumpur, 6th Jan) </h3>
            <button type="submit" value="Register">Register</button>
          </div>
        </div>
        <div class="column">
          <div id="event-card">
            <h1> Lelong.my: Class 101 - Now Everybody Can Sell Online! (English)</h1>
            <h2> Now Everybody Can Sell Online! (English)...  </h2>
            <h3> (Kuala Lumpur, 6th Jan) </h3>
            <button type="submit" value="Register">Register</button>
          </div>
        </div>
      </div>

      <!-- query for max 8 events and list out at here
        for($x = 0; $x <= 10; $x++){
        if ($x is even) then echo <div class="row">
      }
    -->
    </section>

    <a href="browse-events.php" class="see-more-btn">See More</a>
  </div>
</main>

<?php
  include_once 'footer.php';
?>
