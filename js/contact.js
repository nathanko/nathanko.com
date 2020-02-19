(function () {
  // Listen for form submit
  document.querySelector("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
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

function redirectToURL(url) {
  location.href = url;
}

function makeMailtoURL(addr, subject, body) {
  let link = "mailto:" + addr + "?";
  if (subject) {
    link += "subject=" + encodeURIComponent(subject) + "&"
  }
  if (body) {
    link += "body=" + encodeURIComponent(body) + "&"
  }
  return link;
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
      msgEle.innerHTML = "Thanks for your message. I'll be in touch with you soon!";
    }).catch(err => {
        const mailtoLink = makeMailtoURL(getAddr(), "Hello!", message);
        msgEle.innerHTML = `Oops! There was a problem sending your message. Please try again later or <a href='#' onClick='redirectToURL("${mailtoLink}")' title='${mailtoLink}'>send me an email</a> instead.`;
    });
}