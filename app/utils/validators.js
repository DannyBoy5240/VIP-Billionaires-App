const email_pattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phone_number_pattern =
  /(\\+[0-9]+[\\-\\.]*)?(\\([0-9]+\\)[\\-\\.]*)?([0-9][0-9\\-\\.]+[0-9])/;
const url_pattern =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const isValidEmail = email => {
  return email_pattern.test(email);
};

export const isValidPhoneNumber = phone => {
  return phone_number_pattern.test(phone);
};

export const isValidURL = url => {
  return url_pattern.test(url);
};
