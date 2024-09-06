export const numberName = (num: number): string => {
  const numberNames: { [key: number]: string } = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
  };

  const tensNames: { [key: number]: string } = {
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety',
  };

  const convertLargeNumber = (divisor: number, name: string) => {
    const quotient = Math.floor(num / divisor);
    const remainder = num % divisor;
    return `${numberName(quotient)} ${name}${remainder > 0 ? ' ' + numberName(remainder) : ''}`;
  };

  const largeNumbers = [
    { value: 1e12, name: 'trillion' },
    { value: 1e9, name: 'billion' },
    { value: 1e6, name: 'million' },
    { value: 1e3, name: 'thousand' },
    { value: 1e2, name: 'hundred' },
  ];

  const match = largeNumbers.find(item => num >= item.value);
  if (match) {
    return convertLargeNumber(match.value, match.name);
  }

  if (num > 20) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return `${tensNames[tens]}${ones > 0 ? '-' + numberNames[ones] : ''}`;
  }

  return numberNames[num] || 'unknown';
};
