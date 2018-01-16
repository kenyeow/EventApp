<?php include_once "sidebar.php" ?>

<link rel="stylesheet" href="css/manage-event.css">

<div id="event-manager">
  <div id="me-header">
    <p>Manage Event</p>
  </div>
  <div id="me-container">
      <table>
        <thead>
            <th id="check-table"><label><input type="checkbox" />Select All</label></th>
            <th id="event-detail">Events</th>
            <th id="event-location">Location</th>
            <th id="event-date">Date Created</th>
            <th id="event-action">Action</th>
        </thead>
        <tbody>
            <td><label><input type="checkbox" /></label></td>
            <td>
                <h6>Title</h6>
                <p>Content 123123123 Content 123123123 Content 123123123 Content 123123123 Content 123123123 Content 123123123 Content 123123123</p>
            </td>
            <td>Kuala Lumpur</td>
            <td>20 January 2018, 20:02</td>
            <td><button>Edit</button><span> | </span><button>Delete</button></td>
        </tbody>
      </table>
  </div>
</div>

<script type="text/javascript" src="js/manage-event.js"></script>
