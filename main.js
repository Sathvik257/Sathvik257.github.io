emailjs.init("CrMDL6KSAiH4rynzm");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_m02m5u2", "template_k35mz24", this)
    .then(function () {
      const status = document.getElementById("form-status");
      status.textContent = "Message sent successfully!";
      status.style.color = "green";
    }, function (error) {
      const status = document.getElementById("form-status");
      status.textContent = "Failed to send. Try again.";
      status.style.color = "red";
      console.error(error);
    });

  this.reset();
});
