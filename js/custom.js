
(function ($) {

"use strict";

  // NAVBAR
  $('.navbar-collapse a').on('click',function(){
    $(".navbar-collapse").collapse('hide');
  });

  $(function() {
    $('.hero-slides').vegas({
        slides: [
            { src: 'images/slides/sincere-laugh-showing-picture-smartphone-casual-meeting-with-best-friends-restaurant-terrace.jpg' },
            { src: 'images/happy-waitress-giving-coffee-customers-while-serving-them-coffee-shop.jpg' },
            { src: 'images/young-female-barista-wear-face-mask-serving-take-away-hot-coffee-paper-cup-consumer-cafe.jpg' }
        ],
        timer: false,
        animation: 'kenburns',
    });
  });
  
  // CUSTOM LINK
  $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 60;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);

const optionMap = {
  "all-inclusive-service": "All Inclusive Service",
  "pre-loaded-service": "Pre Loaded Bar Service",
  "cash-bar-service": "Cash Bar Service",
  "dry-ice-welcome-service": "Dry Ice Welcome",
  "champagne-tower-service": "Champagne Tower",
  "shot-tower-service": "Shot Tower",
  "phone-number": (val) => `Phone Number: ${val}`,
  "event-date": (val) => `Event Date: ${val}`,
  "event-location": (val) => `Location: ${val}`,
  "guests-estimate": (val) => `Around ${val} people`,
}

window.onload = function(){
  activateCarouselListeners();

  let form = document.getElementsByClassName("custom-form")[0];
  let nameInput = form.querySelector("[name=name].form-control");
  let subjectInput = form.querySelector("[name=subject].form-control");
  let messageInput = form.querySelector("[name=message].form-control");
  let phoneNumberInput = form.querySelector("[name=phone-number].form-control");
  let eventDateInput = form.querySelector("[name=event-date].form-control");
  let eventLocationInput = form.querySelector("[name=event-location].form-control");
  let guestsEstimateInput = form.querySelector("[name=guests-estimate].form-control");
  let checkboxes = form.querySelectorAll("[type=checkbox].form-control");
  let includedOptions = new Set();

  let getIncludedOptions = () => {
    let message = "";

    let specificInputs = [phoneNumberInput, eventDateInput, eventLocationInput, guestsEstimateInput];
    for (field of specificInputs) {
      if (!field.value || field.value == "") continue;
      message += optionMap[field.name](field.value);
    }

    for (let option of includedOptions) {
      message += `\n${optionMap[option]}: Yes`;
    }

    return message;
  };

  let updateEmailToSend = () => {
    console.log("Updated Email To Send");
    let sendButton = form.querySelector("a");
    let name = nameInput.value;
    let subject = subjectInput.value;
    let message = messageInput.value;
    message += getIncludedOptions();
    sendButton.href = `mailto:info@jabebar.co.uk?subject=${name}%20-%20${subject}&body=${message}`
  };
  nameInput.addEventListener("input", updateEmailToSend);
  subjectInput.addEventListener("input", updateEmailToSend);
  messageInput.addEventListener("input", updateEmailToSend);
  phoneNumberInput.addEventListener("input", updateEmailToSend);
  eventDateInput.addEventListener("input", updateEmailToSend);
  eventLocationInput.addEventListener("input", updateEmailToSend);
  guestsEstimateInput.addEventListener("input", updateEmailToSend);

  let updateCheckboxStatus = (e) => {
    const emulate_hover = "emulate-hover";
    let checkbox = e.target;
    if (checkbox.classList.contains(emulate_hover)) {
      checkbox.classList.remove(emulate_hover);
      includedOptions.delete(checkbox.value);
      return
    }
    checkbox.classList.add(emulate_hover);
    includedOptions.add(checkbox.value);
  };
  for (let checkbox of checkboxes) {
    checkbox.onclick = updateCheckboxStatus;
    checkbox.addEventListener("input", updateEmailToSend);
  };

  form.querySelector("a").onclick = (e) => {
    let requiredInputs = form.querySelectorAll(".custom-form .form-control:required");
    for (field of requiredInputs) {
      let text = field.value;
      if (!text || text == "") {
        e.preventDefault();
        window.alert(`Please fill in the required form fields to submit`);
        break;
      }
    }
  }
}

const activateCarouselListeners = () => {
  var carousel = new bootstrap.Carousel('#carouselExampleControls', { interval: false, wrap: false });
  let left = document.getElementsByClassName("carousel-control-prev")[0];
  let right = document.getElementsByClassName("carousel-control-next")[0];

  let useCarousel = () => {
    carousel.carousel()
  };


  left.addEventListener("input", useCarousel);
  right.addEventListener("input", useCarousel);
};
