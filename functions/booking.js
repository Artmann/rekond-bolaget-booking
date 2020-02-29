exports.handler = function(event, context, callback) {
  const {
    email,
    imageFile,
    licensePlateNumber,
    name,
    phoneNumber,
    treatment,
    varnishState
  } = event.body;

  console.log('Processing booking', event.body);
}
