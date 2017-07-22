(function() {
  document.myform.action = "http://formspree.io/"+myEmail();
})

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
