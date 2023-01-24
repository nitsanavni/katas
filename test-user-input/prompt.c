#include <stdio.h>
#include <string.h>

int main() {
  char name[50];
  printf("What is your name?\n");
  fgets(name, sizeof(name), stdin);
  name[strcspn(name, "\n")] = 0;

  char age[3];
  printf("What is your age?\n");
  fgets(age, sizeof(age), stdin);
  age[strcspn(age, "\n")] = 0;

  printf("Hello, %s, You are %s years old!\n", name, age);
  return 0;
}
