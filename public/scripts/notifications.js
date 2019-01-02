$(document).ready(function() {

  const POPUP_SOUND = new Audio("media/sounds/pling_message_notif.mp3");

  $(".enter-button").on("click", function() {
    POPUP_SOUND.play();
  });

})
