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

  if (num > 20) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;

    return `${numberNames[tens * 10]}${ones > 0 ? '-' + numberNames[ones] : ''}`;
  }
  
  return numberNames[num] || 'unknown';
};
