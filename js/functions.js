const checkLength = (string, maxLength) => string.length <= maxLength;

const checkPalindrome = (string) => {
  string = string.replaceAll('', ' ');
  string = string.toLowerCase();
  let emptyString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    emptyString += string[i];
  }
  return string === emptyString;
};
