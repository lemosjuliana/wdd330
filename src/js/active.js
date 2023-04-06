document.addEventListener("DOMContentLoaded", function() {

    const links = document.querySelectorAll("#primaryNav");
    const currentUrl = window.location.href;

    links.forEach(function(link) {
    if (link.href === currentUrl) {
        link.parentNode.classList.add("active");
    }
    });
    console.log("JavaScript code is running on active!");
});
