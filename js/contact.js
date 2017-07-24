$(document).ready(function() {

  //Use JQuery to send the form, not HTML
  $("#contactForm").submit(function(event) {
    event.preventDefault();
    submitContactForm();
  });

});

function myEmail() {
  var a = [99, 109, 106, 110, 89, 89, 104, 50, 94, 79, 96, 82, 73, 84, 79, 81, 14, 65, 75, 71] //contact at... 
  var b = "";
  for (var i in a)
    b += String.fromCharCode(a[i] + 2 * i);
  return b;
}

function sendEmail() {
  var url = "mailto:" + myEmail();
  console.debug(url);
  location.href = url;
}

function submitContactForm() {
  document.getElementById("sent").innerHTML = "Sending...";

  var name = $("input[name=name]").val();
  var email = $("input[name=email]").val().trim();
  var message = $("textarea[name=message]").val();
  var _subject = $("input[name=_subject]").val();
  var _format = $("input[name=_format]").val();
  var _gotcha = $("input[name=_gotcha]").val();

  $.ajax({
    url: "//formspree.io/" + myEmail(),
    method: "POST",
    data: {
      name: name,
      email: email,
      message: message,
      _subject: _subject,
      _format: _format,
      _gotcha: _gotcha
    },
    dataType: "json",
    success: function() {
      document.getElementById("sent").innerHTML = "Message sent. Thanks!";
    },
    error: function(xhr) {
      document.getElementById("sent").innerHTML = "Error sending message. Please try again!";
    }
  });
}
