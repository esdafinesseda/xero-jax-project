import ChatBot, { Flow } from "react-chatbotify";
import { useState } from "react";
import styles from "./JAXStyles";
import settings from "./JAXSettings";
import classifyIntent from "../../api/requests";

function JAX() {
  const [fraudDetails, setFraudDetails] = useState({});

  const themes = [{ id: "simple_blue", version: "0.1.0" }];
  const flow: Flow = {
    start: {
      message:
        "Hello! Welcome to Just Ask Xero (not really) or JAX!\n\nJAX uses an sentence transformer model to link your messages with software functions.\n\nThis application was built as a demo, so functionality is limited. The two main functions are invoice fraud detection and credit score estimates.\n\nPlay around it with it and try out some of the functions!",
      path: async (params) => {
        return classifyIntent(params.userInput);
      },
    },

    poor_result: {
      message:
        "Sorry, I couldn't find a good response for that request. Select one of the options or try again.",
      options: ["Check Fraud", "Credit Score Estimate"],
    },

    help: {
      message:
        "Try some of the following commands: 'This invoice looks sketch!' or 'How's my credit looking?' Alternatively, use the options below:",
      options: ["Check Fraud", "Credit Score Estimate"],
    },

    check_fraud: {
      message:
        "Let's enter the details of the invoice. Who was the invoice paid to?",
      options: ["Jim's Electrics", "Paul's Carpentry", "Sam's Sparkies"],
      chatDisabled: true,
      function: (params) => {
        setFraudDetails({ ...fraudDetails, destination: params.userInput });
      },
      path: "fraud_2",
    },

    fraud_2: {
      message: "From which account was the invoice paid?",
      options: ["Savings", "Credit", "Personal"],
      chatDisabled: true,
      function: (params) => {
        setFraudDetails({ ...fraudDetails, origin: params.userInput });
      },
      path: "fraud_3",
    },

    fraud_3: {
      message: "What was the invoice amount?",
      path: "fraud_4",
      function: (params) => {
        setFraudDetails({ ...fraudDetails, amount: params.userInput });
      },
    },

    fraud_4: {
      message: "Looks good to me!",
    },
  };

  return (
    <ChatBot themes={themes} styles={styles} settings={settings} flow={flow} />
  );
}

export default JAX;
