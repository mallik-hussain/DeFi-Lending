import { useEffect } from "react";

function ChatbotEmbed() {
  useEffect(() => {
    // Add Zapier script
    const script = document.createElement("script");
    script.type = "module";
    script.async = true;
    script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
    document.body.appendChild(script);

    // Add the Zapier chatbot custom element
    const chatbot = document.createElement("zapier-interfaces-chatbot-embed");
    chatbot.setAttribute("is-popup", "true");
    chatbot.setAttribute("chatbot-id", "cmbqqmmzv004roe974rr7n9jj");
    document.body.appendChild(chatbot);

    // Cleanup when component unmounts
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(chatbot);
    };
  }, []);

  return null;
}

export default ChatbotEmbed;
