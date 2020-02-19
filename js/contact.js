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
  
  function handleFormSubmitError(message) {
    const mailtoLink = makeMailtoURL(getAddr(), "Hello!", message);
    msgEle.innerHTML = `Oops! There was a problem sending your message. Please try again later or <a href='#' onClick='redirectToURL("${mailtoLink}")' title='${mailtoLink}'>send me an email</a> instead.`;
  }
  
  msgEle.innerHTML = "Sending...";

  const name = document.querySelector("input[name=name]").value;
  const email = document.querySelector("input[name=email]").value.trim();
  const _gotcha = document.querySelector("input[name=message]").value;
  const real_message = document.querySelector("textarea[name=real_message]").value;
  const _subject = document.querySelector("input[name=_subject]").value;
  const _format = document.querySelector("input[name=_format]").value;

  if (_gotcha) {
    // Non-empty gotcha probably means a spam bot entered data
    handleFormSubmitError(real_message);
    return;
  }

  const url = "https://formspree.io/" + getAddr();
  const options = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      message: real_message,
      _gotcha: _gotcha
    }),
    headers: {
      "Accept": "application/json",
    }
  }

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      msgEle.innerHTML = "Thanks for your message. I'll be in touch with you soon!";
    }).catch(err => {
      handleFormSubmitError(real_message);
    });
}