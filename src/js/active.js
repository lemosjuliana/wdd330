let links = document.querySelectorAll("#primaryNav");
let currentUrl = window.location.href;

links.forEach(function(link) {
    if (link.href === currentUrl) {
        link.classList.add("active");
    }
});