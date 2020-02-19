(function () {
  // Listen for form submit
  document.querySelector("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  console.log("listengn")
  submitContactForm();
  });

})();

function getAddr() {
  const a = [99, 109, 106, 110, 89, 89, 104, 50, 94, 79, 96, 82, 73, 84, 79, 81, 14, 65, 75, 71] //contact at... 
  let b = "";
  for (let i in a)
    b += String.fromCharCode(a[i] + 2 * i);
  return b;
}

function sendMail() {
  location.href = "mailto:" + getAddr();
}

function submitContactForm() {
  const msgEle = document.getElementById("form-response-message")
  
  msgEle.innerHTML = "Sending...";

  const name = document.querySelector("input[id=contact-name]").value;
  const email = document.querySelector("input[id=contact-email]").value.trim();
  const message = document.querySelector("textarea[id=contact-message]").value;
  const _subject = document.querySelector("input[id=_subject]").value;
  const _format = document.querySelector("input[id=_format]").value;
  const _gotcha = document.querySelector("input[id=_gotcha]").value;

  const url = "//formspree.io/" + getAddr();
  const options = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
      _subject: _subject,
      _format: _format,
      _gotcha: _gotcha
    }),
    headers: {
      "Content-Type": "application/json",
      dataType: "json"
    }
  }

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      msgEle.innerHTML = "Thanks for your message. I'll get in touch with you soon!";
    }).catch(err => {
        console.error("Error: ", err);
        msgEle.innerHTML = "Oops, there was a problem sending your message. Please try again later or " +
         "<a href='#' onClick='sendMail()' title='" + "mailto:" + getAddr() + "'>send me an email</a>.";
    });
}