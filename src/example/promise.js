const myPromise = Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("Success!");
    } else {
      reject("Failed!");
    }
  }, 1000);
});

myPromise
  .then((success) => {
    console.log("Message: " + success); // "Message: Success!"
  })
  .catch((error) => {
    console.log("Message: " + error); // "Message: Failed!"
  });

function getUser() {
  return fetch("https://myapi/user")
    .then((response) => response.json())
    .then(
      (result) => result,
      (error) => {
        console.error(error);
        return Promise.reject(error);
      }
    );
}

async function getUserWithAsyncAwait() {
  try {
    const response = await fetch("https://myapi/user");
    const user = await response.json();

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
