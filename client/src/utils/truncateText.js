const truncateText = (text, maxLength = 220) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, text.lastIndexOf(" ", maxLength)) + "..."
    : text;
};

export default truncateText;