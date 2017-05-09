$(document).ready(function(e) {
    console.log("log");
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});

console.log("script ran");