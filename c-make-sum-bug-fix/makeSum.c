#include <stdio.h>

int makeSum(int max)
{
    int i, sum;
    sum = 0;
    i = 0;
    for (i = 1; i <= max; i++)
    {
        sum = sum + i;
    }
    return sum;
}

int main(void)
{
    int input, sum;
    scanf("%d", &input);
    sum = makeSum(input);
    printf("Sum from 1 to %d is %d.\n", input, sum);

    return 0;
}