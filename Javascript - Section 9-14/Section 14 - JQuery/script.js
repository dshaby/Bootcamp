// $("h1").css("color", "red");
$("h1.title");
$("#headerSectionID h1");

$("button").css("color", "green");

$("h1").addClass("big-title margin-50");

$("h1").html("<strong>Heyyyyy</strong>");

$("button").text("Change my text :)");

$("img").attr("src");


$("a").attr("href", "https://www.yahoo.com");

// Event Listeners - 1 Element
$("h1").click(function () {
    $("h1").css("color", "purple");
})
// instead of
// document.querySelector("h1").addEventListener("click", function() {...})

// Event Listeners - Many elements:
$("button").click(function () {
    $("h1").css("color", "green");
})
// Instead of:
// for (var i = 0; i < 5; i++) {
//     document.querySelectorAll("button")[i].addEventListener("click", function () {
//         document.querySelector("h1").style.color = "purple";
//     });
// }

$("input").keydown(function (event) {
    console.log(event.key);
});

$("body").keydown(function (event) {
    $("h1").text(event.key);
})

$("h1").on("mouseover", function () {
    $("h1").css("color", "aquamarine");
});

$("h1").before("<button>New</button>");

// $("button").on("click", function () {
//     $("h1").slideToggle();
// })

// $("button").on("click", function () {
//     $("h1").animate({
//         opacity: 0.5
//     });
// })

// CHAINING Methods
$("button").on("click", function () {
    $("h1").slideUp().slideDown().animate({
        opacity: 0.5
    });
});