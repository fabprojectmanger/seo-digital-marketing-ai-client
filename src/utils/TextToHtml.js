const TextToHTML = (text) => {
  let convertedText = text.replace(/</g, "&lt;");
  convertedText = convertedText.replace(/>/g, "&gt;");
  convertedText = convertedText.replace(/^##(.*?)###$/gm, "<h3>$1</h3>");
  convertedText = convertedText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  ); 
  convertedText = convertedText.replace(/^\* (.*?)$/gm, "<ul><li>$1</li></ul>");
  convertedText = convertedText.replace(/^\- (.-?)$/gm, "<ul><li>$1</li></ul>"); 
  convertedText = convertedText.replace(/<\/ul>\n<ul>/g, "\n"); 
  convertedText = convertedText.replace(
    /```(.*?)```/gs,
    "<pre><code>$1</code></pre>"
  );
  convertedText = convertedText.replace(/`(.*?)`/g, "<code>$1</code>");
  convertedText = convertedText.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );
  convertedText = convertedText.replace(/# (\w+)/g, "<b>$1</b>");
  convertedText = convertedText.split('\n').map(line => {
    if (!line.startsWith('<') && line.trim().length > 0) {
      return `<p>${line}</p>`;
    }
    return line;
  }).join('\n');    
  return convertedText;
};

export default TextToHTML;