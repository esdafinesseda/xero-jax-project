import { randomInt } from "crypto";

interface FraudDetails {
  originBalance: number;
  destinationBalance: number;
  amount: number;
  type: number;
  time: number;
}
const valueMap: { [key: string]: number } = {
  Cash: 1,
  Credit: 3,
  Debit: 4,
};

const cleanFraud = (form: any) => {
  const fraudDetails: FraudDetails = {
    amount: form.amount,
    originBalance: randomInt(10000) + form.amount,
    destinationBalance: randomInt(10000) + form.amount,
    type: valueMap[form.type],
    time: randomInt(12),
  };

  return fraudDetails;
};

export default cleanFraud;
