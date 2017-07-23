$( document ).ready(function() {
  document.getElementById('contactForm').setAttribute("action", "https://formspree.io/"+myEmail());
  if (window.location.hash == "#sent"){
    document.getElementById("sent").style.display = "inline";
  }
});

function myEmail() {
  var a = [99, 109, 106, 110, 89, 89, 104, 50, 94, 79, 96, 82, 73, 84, 79, 81, 14, 65, 75, 71] //contact at... 
  var b = "";
  for (var i in a)
    b += String.fromCharCode(a[i] + 2 * i);
  return b;
}

function sendEmail() {
  var url = "mailto:"+myEmail();
  console.debug(url);
  location.href = url;
}

function submitContactForm() {
  $.ajax({
    url: "https://formspree.io/"+myEmail(), 
    method: "POST",
    beforeSend: function(xhr){
      xhr.setRequestHeader('Referer', 'http://nathanko.com/');
      },
    data: {message: "hello!"},
    dataType: "json"
  });
}