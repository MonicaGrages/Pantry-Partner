$(function () {
  //if this is a food item show page (has expiration date div on it)
  if ($('.expirationDate').length > 0) {
    //if there is no expiration date entered
    if($('.expirationDate').html().length === 0) {
      //just empty the whole expiration date line
      $('.expiration_line').empty();
      //if there is an expiration date listed
    } else if ($('.expirationDate').html().length > 0) {
      var currentDate = new Date();
      //grab food expiration date from DOM and turn back into date object
      var expirationDate = new Date($('.expirationDate').html());
      // expirationDate = expirationDate.toISOString();

      //check whether expiration date has passed
      if (currentDate > expirationDate) {
        //add food is expired message to item show page
        $('.food_info').prepend('<p class="expiration_message">This food has expired</p>');
        $('.expirationDate').addClass('expired_date');
      }
       //change date display to short form date
      $('.expirationDate').html(expirationDate.toISOString().slice(0,10));
    }
  }


    //this is not working yet
    //if there are any expiration dates on the page (if on user show page)
    if($('.user_page_expirationDate').length > 0) {
      //for each expiration date
      for(var i=0; i < ($('.user_page_expirationDate').length); i++) {
        var $expirationDateElement = $('.user_page_expirationDate')[i];
        // get the content of the element and turn it back into a date
        var expirationDate = new Date($expirationDateElement.textContent);

        //set the current date to right now
        var currentDate = new Date();
        //check whether expiration date has passed
        if (currentDate > expirationDate) {
          //get the parent element of the expiration date span (it's the food name)
          var expiredFoodName = $expirationDateElement.parentNode;
          //add "- expired" to the end of it and add the expired class (has color: red)
          expiredFoodName.append(' - expired');
          $(expiredFoodName).addClass('expired_date');
        }
      }
    }


  // if ()

});



