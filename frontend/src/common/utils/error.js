export {notifyApiErrorMessage};

/**
 * エラーメッセージを出力する.
 * @param {Error} err - axiosがthrowしたエラーオブジェクト.
 */
const notifyApiErrorMessage = (err) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    alert(`status: ${err.response.status}
applicationName: ${err.response.data.applicationName}
message: ${err.response.data.message}
          `);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    alert(err.request);
    console.error(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    alert('Error', err.message);
    console.error(err.message);
  }
};
