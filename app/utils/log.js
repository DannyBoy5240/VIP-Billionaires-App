export default (e, message = null) => {
  if (e instanceof Error && e.message !== 'Aborted' && !__DEV__) {
  } else {
    console.log(message ? message : 'Error: ', e);
  }
};
