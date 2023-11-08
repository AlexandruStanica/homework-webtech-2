/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
  const isObject = o =>
    typeof o === "object" && o !== null && !Array.isArray(o);

  if (!isObject(input) || !isObject(values)) {
    throw new Error("InvalidType");
  }

  if (Object.keys(input).length === 0) {
    return "";
  }

  if (Object.keys(values).length === 0) {
    return Object.entries(input).map(([key, value]) => {
      return `<${key}>${value}</${key}>`;
    })[0];
  }

  let str = "";

  function convertToHTML(obj) {
    if (isObject(obj)) {
      Object.entries(obj).map(([key, value]) => {
        str += `<${key}>`;
        convertToHTML(value);
        str += `</${key}>`;
        return str;
      });
    } else {
      let replacedObj = obj.replace(
        /\${(.*?)}/g,
        (match, placeholder) => {
          return values[placeholder];
        }
      );

      str += replacedObj;
    }

    return str;
  }

  return convertToHTML(input);
}

module.exports = {
  render
};
