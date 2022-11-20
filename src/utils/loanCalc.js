const LoanCalculator = (amount, rate, period) => {
  const principal = parseFloat(amount);
  const interest = parseFloat(rate) / 100 / 12;
  const payments = parseFloat(period) * 12;

  const x = Math.pow(1 + interest, payments);
  const monthly = (principal * x * interest) / (x - 1);

  const payment = monthly.toFixed(2);
  const total = (monthly * payments).toFixed(2);
  const totalinterest = (monthly * payments - principal).toFixed(2);

  return [payment, total, totalinterest];
};

export default LoanCalculator;
