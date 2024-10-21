export function adjustBubbleWidth(messages) {
    messages.forEach((messageElement) => {
      const textLength = messageElement.innerText.length;
  
      if (textLength < 20) {
        messageElement.style.maxWidth = '40%';
      } else if (textLength >= 20 && textLength < 50) {
        messageElement.style.maxWidth = '60%';
      } else {
        messageElement.style.maxWidth = '100%';
      }
    });
  }
  