const FormatCurrency = (valueInCents) => {
  const valueInReal = valueInCents / 100; 

  const numberFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return numberFormat.format(valueInReal);
};

export default FormatCurrency;
