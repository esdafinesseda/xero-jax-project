import classifyIntent from "../../api/requests";
import { Flow } from "react-chatbotify";

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
    path: "fraud_2",
  },

  fraud_2: {
    message: "To which account was the invoice paid?",
    options: ["Savings", "Credit", "Personal"],
    chatDisabled: true,
    path: "fraud_3",
  },

  fraud_3: {
    message: "What was the invoice amount?",
    path: "fraud_4",
  },

  fraud_4: {
    message: "Looks good to me!",
  },
};

export default flow;
