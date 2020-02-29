exports.handler = function(event, context, callback) {
  console.log('Processing booking', event);

  if (event.httpMethod === 'OPTIONS') {
    return callback(null, { statusCode: 200 });
  }

  const {
    email,
    imageFile,
    licensePlateNumber,
    name,
    phoneNumber,
    treatment,
    varnishState
  } = event.body;



  callback(null, {
    statusCode: 200,
    body: "Hello, World " + event.body
  });
}
