// Function to animate the typing effect
function typeWriter(text, i, typingText) {
    if (i < text.length) {
        if (text.substring(i, i + 8) === "Business") {
            typingText.innerHTML += "<span class='highlight'>" + text.substring(i, i + 8) + "</span>";
            i += 7; // Skip ahead to the end of the highlighted word
        } else {
            typingText.innerHTML += text.charAt(i);
        }
        i++;
        setTimeout(function () {
            typeWriter(text, i, typingText);
        }, 100); // Change the delay (in milliseconds) to control the typing speed
    } else {
        setTimeout(function () {
            typingText.innerHTML = '';
            typeWriter(text, 0, typingText);
        }, 1000); // Change the delay (in milliseconds) for the pause before the next loop
    }
}

// Function to start the typing animation
function startTypingAnimation() {
    var text = "Transform Your Business with Our IT Solutions";
    var typingText = document.getElementById("typing-text");
    typeWriter(text, 0, typingText);
}

// Start the initial typing animation
startTypingAnimation();



window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
      navbar.classList.add("navbar-scroll");
    } else {
      navbar.classList.remove("navbar-scroll");
    }
  });

 // Get the current page URL
 var url = window.location.href;

 // Get the filename from the URL
 var filename = url.substring(url.lastIndexOf("/") + 1);

 // Find the corresponding navigation link and add the "active" class
 var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
 for (var i = 0; i < navLinks.length; i++) {
     var link = navLinks[i];
     var linkHref = link.getAttribute("href");
     if (filename.includes(linkHref)) {
         link.classList.add("active");
         break;
     }
 }


