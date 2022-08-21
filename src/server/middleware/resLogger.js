export const middleware = (req, res, next) => {
  console.log('Response......................')
  const { statusCode, statusMessage } = res;
  console.log(statusCode, ': ', statusMessage)

  var oldWrite = res.write,
      oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(new Buffer(chunk));

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(new Buffer(chunk));

    var body = Buffer.concat(chunks).toString('utf8');
    console.log('body: ', body);

    oldEnd.apply(res, arguments);
  };

  next();
}
