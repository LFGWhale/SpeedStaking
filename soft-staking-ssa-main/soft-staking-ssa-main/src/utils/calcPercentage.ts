function calcPercentage(partialValue: number, totalValue: number) {
  if (!partialValue || !totalValue) return 0;
  return (100 * partialValue) / totalValue;
}

export { calcPercentage };
