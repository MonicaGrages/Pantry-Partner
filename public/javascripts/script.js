var currentDate = new Date();

var expirationDate = new Date($('.expirationDate').html());

if (currentDate > expirationDate) {
  $('.food_info').prepend('<p class="expiration_message">This food has expired</p>');
  $('.expirationDate').addClass('expired_date');
}
