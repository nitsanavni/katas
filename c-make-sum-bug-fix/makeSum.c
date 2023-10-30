#include <stdio.h>

// Function prototypes
static int compute_sum(int max);

// Main function
int main(void)
{
    int input = 0;
    printf("Enter a number: \n");
    if(scanf("%d", &input) != 1)
    {
        printf("Invalid input. Please, enter a number.\n");
        return 1;
    }
    if(input <= 0)
    {
        printf("Invalid input. Please, enter a positive number.\n");
        return 1;
    }

    printf("The sum from 1 to %d is %d.\n", input, compute_sum(input));
    return 0;
}

// Function to compute the sum from 1 to the given max number
static int compute_sum(int max)
{
    int sum = 0;
    for (int i = 1; i <= max; i++)
    {
        sum += i;
    }
    return sum;
}