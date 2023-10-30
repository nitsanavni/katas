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