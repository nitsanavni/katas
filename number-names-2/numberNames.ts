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

  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    return `${numberName(thousands)} thousand${remainder > 0 ? ' ' + numberName(remainder) : ''}`;
  }

  if (num >= 100) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;
    return `${numberName(hundreds)} hundred${remainder > 0 ? ' ' + numberName(remainder) : ''}`;
  }

  if (num > 20) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return `${tensNames[tens]}${ones > 0 ? '-' + numberNames[ones] : ''}`;
  }

  return numberNames[num] || 'unknown';
};
