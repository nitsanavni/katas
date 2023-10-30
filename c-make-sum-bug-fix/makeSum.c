#include <stdio.h>

int compute_sum(int max)
{
    int sum = 0;
    for (int i = 1; i <= max; i++)
    {
        sum += i;
    }
    return sum;
}

int main(void)
{
    int input;
    printf("Enter a number: \n");
    scanf("%d", &input);
    printf("The sum from 1 to %d is %d.\n", input, compute_sum(input));
    return 0;
}