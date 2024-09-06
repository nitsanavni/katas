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

  const find = (arr: { value: number, name: string }[], defaultValue: string) => {
    const match = arr.find(item => num >= item.value);
    return match ? convertLargeNumber(match.value, match.name) : defaultValue;
  };

  const largeNumbers = [
    { value: 1000000, name: 'million' },
    { value: 1000, name: 'thousand' },
    { value: 100, name: 'hundred' },
  ];
  
  const foundLargeNumber = find(largeNumbers, null);
  if (foundLargeNumber) {
    return foundLargeNumber;
  }

  if (num > 20) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return `${tensNames[tens]}${ones > 0 ? '-' + numberNames[ones] : ''}`;
  }

  return numberNames[num] || 'unknown';
};
