User
Uploaded image
just transcribe
ChatGPT
Sure, here's the transcription of the code:

c
Copy code
OUT OF CODE
int makeSum(int max) {
    int i, sum;
    sum = 0;
    i = 0;
    while(i < max){
        sum = sum + i;
        i = i + 1;
    }
    return sum;
}

void main(void) {
    int input, sum;
    scanf("%d", &input);
    sum = makeSum(input);
    printf("Sum from 1 to %d is %d.\n", input, sum);
}
Note: The line "OUT OF CODE" is included as it was in the image, but in a typical code environment, you would not include such a line. Additionally, the "void main(void)" signature might not be standard in all C environments, and you might want to use "int main(void)" and return a value at the end.