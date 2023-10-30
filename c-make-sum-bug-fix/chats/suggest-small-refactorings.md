# user

suggest small refactorings

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


# assistant

Refactored Code:

```c
#include <stdio.h>

int makeSum(int max){
    int sum = 0;
    
    for (int i = 1; i <= max; i++){
        sum += i;
    }
   
    return sum;
}

int main(void){
    int input;
   
    scanf("%d", &input);
    printf("Sum from 1 to %d is %d.\n", input, makeSum(input));

    return 0;
}
```

Refactorings made: 

1) Declare `i` variable directly in the `for` loop.

2) Simplify `sum = sum + i` to `sum += i`;

3) Remove redundant `sum` variable in main() method. You can directly use the `makeSum(input)` as parameter in `printf()`.


