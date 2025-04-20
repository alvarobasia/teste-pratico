const TAX_BRACKETS = [
  { max: 2259.2, rate: 0, deduction: 0 },
  { max: 2826.65, rate: 0.075, deduction: 169.44 },
  { max: 3751.05, rate: 0.15, deduction: 381.44 },
  { max: 4664.68, rate: 0.225, deduction: 662.77 },
  { max: Number.POSITIVE_INFINITY, rate: 0.275, deduction: 896.0 },
];

export const getIRDiscount = (irBaseValue: number): number => {
  const bracket = TAX_BRACKETS.find((bracket) => irBaseValue <= bracket.max);
  if (!bracket) {
    return 0;
  }
  return irBaseValue * bracket.rate - bracket.deduction;
};
