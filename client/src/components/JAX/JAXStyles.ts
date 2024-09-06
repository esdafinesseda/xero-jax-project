import { Styles } from "react-chatbotify";

const styles: Styles = {
  headerStyle: {
    background: "linear-gradient(to right, #06b3e8, #0078C8)",
    fontFamily: "Proxima Nova Bold",
  },

  chatWindowStyle: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    boxShadow: "",
    border: "",
  },

  userBubbleStyle: {
    textAlign: "left",
    borderRadius: "20px 20px 20px 20px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Proxima Nova",
    border: "2.5px solid #0078C8",
    borderColor: "linear-gradient(to right, #06b3e8, #0078C8)",
    padding: "12px",
    boxShadow: "0 0 10px linear-gradient(to right, #06b3e8, #0078C8)",
  },

  botBubbleStyle: {
    fontFamily: "Proxima Nova",
    borderRadius: "20px 20px 20px 20px",
  },

  chatInputAreaStyle: {
    fontFamily: "Proxima Nova",
  },
};

export default styles;
