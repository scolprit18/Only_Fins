"use strict";

//weather API
const apiKey = "1b22375063a56f27185ed953e484b7bc";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=28.0342&lon=-82.6651&appid=${apiKey}&units=imperial`;

fetch(url)

  .then(response => response.json())

  .then(data => {

   let degSym = String.fromCharCode(176);

    document.getElementById("current").textContent = `Currently: ${data.main.temp} ${degSym}F`;
    document.getElementById("feels").textContent = `Feels like: ${data.main.feels_like} ${degSym}F`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity} %`;

  })

  .catch(error => console.error("Error fetching weather data:", error));

//carousel
$(document).ready(function(){
  let interval = window.setInterval(rotateSlides, 3000)
        
    function rotateSlides(){
        let $firstSlide = $('#carousel').find('div:first');
        let width = $firstSlide.width();
          
        $firstSlide.animate({marginLeft: -width}, 1000, function(){
            let $lastSlide = $('#carousel').find('div:last')
            $lastSlide.after($firstSlide);
            $firstSlide.css({marginLeft: 0})
        })
    }

    $('#left-arrow').click(previousSlide);
    $('#right-arrow').click(nextSlide);
    $('.slide-image').click(nextSlide);

    function nextSlide(){
        window.clearInterval(interval);
        let $currentSlide = $('#carousel').find('div:first');
        let width = $currentSlide.width();
        $currentSlide.animate({marginLeft: -width}, 1000, function(){
        let $lastSlide = $('#carousel').find('div:last')
        $lastSlide.after($currentSlide);
        $currentSlide.css({marginLeft: 0})
        interval = window.setInterval(rotateSlides, 3000);
        });
    }

    function previousSlide(){
        window.clearInterval(interval);
        let $currentSlide = $('#carousel').find('div:first');
        let width = $currentSlide.width();
        let $previousSlide = $('#carousel').find('div:last')
        $previousSlide.css({marginLeft: -width})
        $currentSlide.before($previousSlide);
        $previousSlide.animate({marginLeft: 0}, 1000, function(){
        interval = window.setInterval(rotateSlides, 3000);
        });
    }
})
//calendar
$( "#datepicker" ).datepicker();

// open form after selecting appointment date
$( function() {
	$( "#popup" ).dialog({
		autoOpen: false,
		show: {
			effect: "fade",
			duration: 1000
		},
		hide: {
			effect: "fade",
			duration: 1000
		}
	});

    $( "#openPopup" ).on( "click", function() {
	    $( "#popup" ).dialog( "open" );
	});
});

let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phoneNum");
let timeInput = document.getElementById("time");

// open confirm after submitting form
$( function() {
	$( "#confirm" ).dialog({
		autoOpen: false,
		show: {
			effect: "fade",
			duration: 1000
		},
		hide: {
			effect: "fade",
			duration: 1000
		}
	});

    $( "#submit" ).on( "click", function() {
        if (nameInput.value === "" || phoneInput.value === "" || timeInput.value === ""){
              
            document.getElementById("submit").addEventListener("click", storeInfo);
        } 
        else {
            $( "#popup" ).dialog( "close" );    
            $( "#confirm" ).dialog( "open" ); 
        }   
    });
});


$("#ok").on("click", function() {
    $("#confirm").dialog("close");
})

//web storage
function storeInfo(e) {
	e.preventDefault();
	
	let output = document.getElementById("message");
	
	if (localStorage.getItem("name")) { 
		// if we're inside of this block, the key value pair has already been saved in local storage previously, so we just need to load it on the page
		output.innerHTML = `Welcome back, ${localStorage.getItem("name")}!`;
	}
    else {
		
        let nameError = document.getElementById("name-error");
        let phoneError = document.getElementById("phone-error");
        let timeError = document.getElementById("time-error");

		nameInput.classList.remove("errorInput");
		nameError.classList.remove("error");
        
        phoneInput.classList.remove("errorInput");
		phoneError.classList.remove("error");

        timeInput.classList.remove("errorInput");
		timeError.classList.remove("error");

		if (nameInput.value === "") {
			nameInput.classList.add("errorInput");
			nameError.classList.add("error"); 
		}
        if (phoneInput.value === "") {
            phoneInput.classList.add("errorInput");
		    phoneError.classList.add("error");
        }
        if (timeInput.value === "") {
            timeInput.classList.add("errorInput");
		    timeError.classList.add("error");
        }
        else{
			localStorage.setItem("name", nameInput.value);
            localStorage.setItem("phone", phoneInput.value);
            localStorage.setItem("time", timeInput.value);
			
			output.innerHTML = `Welcome, ${localStorage.getItem("name")}!`;
			
			nameInput.value = "";
            phoneInput.value = "";
            timeInput.value = "";
		}
	}
}
