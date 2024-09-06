import axios from "axios";

const classify_intent = async (userInput: string) => {
  const url = "http://localhost:8000/chat";
  const data = {
    query: userInput,
  };
  let intent = "";

  try {
    const response = await axios.post(url, data);
    intent = response.data.function;
  } catch (error) {
    console.log("Error Making Request: ", error);
    intent = "error";
  }

  return intent;
};

export default classify_intent;
