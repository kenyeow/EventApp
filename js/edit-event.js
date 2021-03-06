$(document).ready(function() {
  // sidebar css effect
  $(".main-item").removeClass("active");
  $("#manage-event svg").removeClass("fill-svg");
  $("#manage-event").addClass("active");
  $("#manage-event svg").addClass("fill-svg");

  $(".sub-item").removeClass("active");
  $("#create").addClass("active");
  $(".manage-event").slideDown();

  // materialized text input
  $(document).on("focus", ".event-input", function(){
    $(this).parent().addClass("input-active input-complete");
  });

  $(document).on("focusout", ".event-input", function(){
    if($(this).val() === "")
      $(this).parent().removeClass("input-complete");
      $(this).parent().removeClass("input-active");
  })

  // event content editor
  $('#summernote').summernote({
    placeholder: 'Write your event details here...',
    height: 300,
    maxheight: null,
    minheight: null,
    toolbar: [
      ['undo'],
      ['redo'],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['link', ['linkDialogShow', 'unlink']],
      ['table', ['table']]
    ],
    lineHeight: '20px'
  });
  $('.note-editable').css('font-size','18px');
  $('#summernote').summernote('code', e_content);

  // assign event Location
  $("#title").val(e_title);
  $("#title").parent().addClass("input-active input-complete");
  $("#location").val(e_loc);
  $("#participant").val(e_part);



  // EVENT CALENDAR
  $('#from-calendar').datepicker({
    inline: true,
    firstDay: 0,
    showOtherMonths: true,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  });

  $('#to-calendar').datepicker({
    inline: true,
    firstDay: 0,
    showOtherMonths: true,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  });


  e_sdate = new Date(e_sdate)
  e_sdate = moment().year(e_sdate.getFullYear()).month(e_sdate.getMonth()).date(e_sdate.getDate());
  var set_e_sdate = e_sdate.format('MMMM D, YYYY')
  $("#from-date").html(set_e_sdate);

  e_edate = new Date(e_edate)
  e_edate = moment().year(e_edate.getFullYear()).month(e_edate.getMonth()).date(e_edate.getDate());
  var set_e_edate = e_edate.format('MMMM D, YYYY')
  $("#to-date").html(set_e_edate);

  $(document).on("change", "#from-calendar", function() {
    var selected = $('#from-calendar').datepicker("getDate");
    selected = new Date(selected)
    selected = moment().year(selected.getFullYear()).month(selected.getMonth()).date(selected.getDate());
    var setSelected = selected.format('MMMM D, YYYY')
    $("#from-date").html(setSelected);
    $(this).slideUp(100);
    $("#to-calendar").slideDown(100);
  })
  $(document).on("change", "#to-calendar", function() {
    var selected = $('#to-calendar').datepicker("getDate");
    selected = new Date(selected)
    selected = moment().year(selected.getFullYear()).month(selected.getMonth()).date(selected.getDate());
    var setSelected = selected.format('MMMM D, YYYY')
    $("#to-date").html(setSelected);
    $(this).slideUp(100);
  })

  $(".event-date").click(function() {
    $(this).find(".calendar").slideToggle(100)
  })
  $(document).click(function (e) {
    var target = e.target;
    if (!$('.event-date').is(target) && $('.event-date').has(e.target).length === 0) {
      $(this).find(".calendar").slideUp(100)
    }
  })

  // load images
  var imgarr = e_imgarr;//JSON.parse();
  var i = 0;
  function appendImg(i) {
      var img = new Image();
      img.src = imgarr[i]['src'];

      img.onload = function() {
          if (this.width > this.height) dim = 'style="height: 100%;"';
          else if (this.width < this.height) dim = 'style="width: 100%;"';
          else dim = 'style="height: 100%;"';
          $("#temp-upload").append('<div class="temp-img-card"><div class="temp-img"><img '+dim+' src="'+ img.src +'" /></div><div class="temp-img-details"><div class="form-input"><label class="input-lbl">Image Alt </label><input type="text" class="event-input img-alt" /></div><div class="form-input"><label class="input-lbl">Image Caption </label><input type="text" class="event-input img-cap" /></div><button class="delete-img">Delete</button></div></div>');
          if (i < imgarr.length - 1) {
              i ++;
              appendImg(i);
          }
      }
  }
  if(imgarr.length > 0) {
      appendImg(i);
  }

  // upload Images
  $(document).on("change", "#image-uploader", function() {
    var dim;
    var fd = new FormData();
    for (var x = 0; x < this.files.length; x++) {
      fd.append( 'image[]', this.files[x] );
    }
    $.ajax({
      url: 'ajax/upload_images.php',
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data){
        var data = JSON.parse(data);
        if (data[0] == "error") {
          alert(data)
        }
        else {
          for (var i = 0; i < data.length; i ++){
            if (data[i]['img_width'] > data[i]['img_height']) dim = 'style="height: 100%;"';
            else if (data[i]['img_width'] < data[i]['img_height']) dim = 'style="width: 100%;"';
            else dim = 'style="height: 100%;"';

            $("#temp-upload").append('<div class="temp-img-card"><div class="temp-img"><img '+dim+' src="'+ data[i]['img_src'] +'" /></div><div class="temp-img-details"><div class="form-input"><label class="input-lbl">Image Alt </label><input type="text" class="event-input img-alt" /></div><div class="form-input"><label class="input-lbl">Image Caption </label><input type="text" class="event-input img-cap" /></div><button class="delete-img">Delete</button></div></div>');
          }
        }
      }
    });
  })

  // delete img
  $(document).on("click", ".delete-img", function() {
    $(this).parent().parent().remove();
  })

  // google location service
  var lat, lng, autocomplete;
  function initialize() {
    var mapOptions = {
      center: {lat: parseFloat(e_lat), lng: parseFloat(e_long)},
      zoom: 17,
      scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    var input = /** @type {HTMLInputElement} */(
        document.getElementById('location'));

    // Create the autocomplete helper, and associate it with
    // an HTML text input box.
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow({
        content: e_loc
    });
    var marker = new google.maps.Marker({
      position: {lat: parseFloat(e_lat), lng: parseFloat(e_long)},
      map: map
    });
    lat = parseFloat(e_lat);
    lng = parseFloat(e_long);
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace(/** @type {!google.maps.Place} */ ({
        placeId: place.place_id,
        location: place.geometry.location
      }));

      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();

      marker.setVisible(true);

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Location: ' + place.geometry.location + '<br>' +
          place.formatted_address + '</div>');
      infowindow.open(map, marker);
    });
  }

  // Run the initialize function when the window has finished loading.
  google.maps.event.addDomListener(window, 'load', initialize);

  // modal
  $(".modal-close").click(function() {
    $(".modal").hide();
    $(".modal-mask").hide();
  })

  // time
  $("#time-am-pm").click(function() {
    if ($(this).html() == "AM") {
      $(this).html("PM");
    } else {
      $(this).html("AM");
    }
  })

  // assign edit start time
  var time_edit = e_stime.split(":");
  $(".time #hour").val(time_edit[0]);
  $(".time #minute").val(time_edit[1].slice(0,2));
  $("#time-am-pm").html("").html(time_edit[1].slice(2,4));

  $(".time #hour").on("change", function() {
    if (parseInt($(this).val()) < 10) $(this).val('0'+$(this).val())
    if (parseInt($(this).val()) < 1 || parseInt($(this).val()) > 12 || $(this).val().length > 2) {
      alert("Error: value for hour must between 1 and 12.");
      $(this).val("01")
    }
  })

  $(".time #minute").on("change", function() {
    if (parseInt($(this).val()) < 10) $(this).val('0'+$(this).val())
    if (parseInt($(this).val()) < 1 || parseInt($(this).val()) > 59 || $(this).val().length > 2) {
      alert("Error: value for hour must between 00 and 59.");
      $(this).val("00")
    }
  })

  $(".hour .minus-time").click(function() {
    var hour = $(this).parent().find("input");
    if (parseInt(hour.val()) > 1) {
      var minus_hour = parseInt(hour.val()) - 1;
      if (minus_hour < 10) hour.val("0"+minus_hour)
      else hour.val(minus_hour)
    }
    else if (parseInt(hour.val()) == 1) {
      hour.val("12");
    }
  })

  $(".hour .add-time").click(function() {
    var hour = $(this).parent().find("input");
    if (parseInt(hour.val()) < 12) {
      var add_hour = parseInt(hour.val()) + 1;
      if (add_hour < 10) hour.val("0"+add_hour)
      else hour.val(add_hour)
    }
    else if (parseInt(hour.val()) == 12) {
      hour.val("01")
    }
  })

  $(".minute .minus-time").click(function() {
    var minute = $(this).parent().find("input");
    if (parseInt(minute.val()) > 0) {
      var minus_hour = parseInt(minute.val()) - 1;
      if (minus_hour < 10) minute.val("0"+minus_hour)
      else minute.val(minus_hour)
    }
    else if (parseInt(minute.val()) == 0) {
      minute.val("59");
    }
  })

  $(".minute .add-time").click(function() {
    var minute = $(this).parent().find("input");
    if (parseInt(minute.val()) < 59) {
      var add_hour = parseInt(minute.val()) + 1;
      if (add_hour < 10) minute.val("0"+add_hour)
      else minute.val(add_hour)
    }
    else if (parseInt(minute.val()) == 59) {
      minute.val("00")
    }
  })



  // CREATE EVENT
  $("#save-event-button").click(function() {
    var start_date = $('#from-calendar').datepicker("getDate");
    var start_date = $.datepicker.formatDate('dd-mm-yy', new Date(start_date));
    var end_date = $('#to-calendar').datepicker("getDate");
    var end_date = $.datepicker.formatDate('dd-mm-yy', new Date(end_date));
    var time = $("#hour").val() + ":" + $("#minute").val() + $("#time-am-pm").html()
    var title = $("#title").val()
    var content;
    if ($('#summernote').summernote('isEmpty')) {
        content = "";
    }
    else {
        content = $('#summernote').summernote('code')
    }
    var event_images = [];
    var event_location = $("#location").val();
    var participant = $("#participant").val();

    $(".temp-img-card").each(function() {
      var img_src = $(this).find('img').attr('src');
      var img_alt = $(this).find('input.img-alt').val();
      var img_cap = $(this).find('input.img-cap').val();
      var supporting_images = {
        "img_src": img_src,
        "img_alt": img_alt,
        "img_cap": img_cap
      }
      event_images.push(supporting_images);
    })
    var latitude = lat;
    var longitude = lng;

    $.post("ajax/save_event.php", {
      action: "update",
      event_id: e_id,
      start_date: start_date,
      end_date: end_date,
      time: time,
      title: title,
      content: content,
      images: event_images,
      lat: latitude,
      lng: longitude,
      location: event_location,
      participant: participant
    }, function(response) {

    })
  })
})
