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


  //If the food group is fats/oils/sweets, I simplified the value to fats,
  //but I want it to display the whole name on item show page
  if ($('.food_group_span').html() === 'fats') {
    $('.food_group_span').html('fats, oils, and sweets');
  }


  //if on a page with food group form class (food item edit page)
  if ($('input.food_group').length > 0) {
    //find the food group of the food based on the food group image shown (the food group is not otherwise listed on the page to grab)
    var foodGroupImage = $('.food_group_image_show_page').attr('src');
    //add the 'checked' attribute to the corresponding radio input option
    switch (foodGroupImage) {
      case '/images/protein.png':
        $('#protein').attr('checked', true);
        break;
      case '/images/fruits.png':
        $('#fruits').attr('checked', true);
        break;
      case '/images/vegetables.png':
        $('#vegetables').attr('checked', true);
        break;
      case '/images/dairy.png':
        $('#dairy').attr('checked', true);
        break;
      case '/images/fats.png':
        $('#fats').attr('checked', true);
        break;
      case '/images/other.png':
        $('#other').attr('checked', true);
        break;
      case '/images/grains.png':
        $('#grains').attr('checked', true);
    }
  }


});

