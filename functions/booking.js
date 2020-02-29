exports.handler = function(event, context, callback) {
  const args = JSON.parse(event.body);

  console.log('Processing booking', args);
}
