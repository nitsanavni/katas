#include <stdio.h>

int validate_input(int input, int scanfResult); // Function prototype for input validation
static int compute_sum(int max);                // Function prototype for computing sum

int main(void)
{
    int input = 0;
    printf("Enter a number: \n");
    int scanfResult = scanf("%d", &input);
    if (!validate_input(input, scanfResult))
    {
        return 1;
    }

    printf("The sum from 1 to %d is %d.\n", input, compute_sum(input));
    return 0;
}

int validate_input(int input, int scanfResult) // Function for Input Validation
{
    if (scanfResult != 1)
    {
        printf("Invalid input. Please, enter a number.\n");
        return 0; // Returns false if scanf failed
    }

    if (input <= 0)
    {
        printf("Invalid input. Please, enter a positive number.\n");
        return 0;
    }

    return 1; // Returns true if input is valid
}

static int compute_sum(int max) // Function to compute the sum from 1 to the given max number
{
    int sum = 0;
    for (int i = 1; i <= max; i++)
        sum += i;

    return sum;
}