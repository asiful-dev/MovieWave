const truncateText = (text, maxLength = 200) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, text.lastIndexOf(" ", maxLength)) + "..."
    : text;
};

export default truncateText;