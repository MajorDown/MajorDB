function checkResult(status, message, data) {
  if (data) {
    return {
      status,
      message,
      data,
    };
  } else if (!data)
    return {
      status,
      message,
    };
}

module.exports = checkResult;
