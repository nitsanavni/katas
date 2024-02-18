const fizzbuzz = () => {
  for (let i = 1; i <= 100; i++) {
    calculateFizzBuzzOutput(i);
  }
};
function calculateFizzBuzzOutput(i: number) {
  let output = "";
  if (i % 3 === 0) output += "Fizz";
  if (i % 5 === 0) output += "Buzz";
  const result = output || i;
  console.log(result);
}
