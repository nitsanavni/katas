/*
 * Check: a unit test framework for C
 * Copyright (C) 2001, 2002 Arien Malec
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 */

#include "money.h"
#include <stdio.h>  // `printf()`
#include <stdlib.h> // `getenv()`
#include <unistd.h> // `sleep()`

struct Money {
  int amount;
  char *currency;
};

int calls = 0;

void wait_for_gdb() {
  printf("calls %d", calls++);
  printf("getenving\n\n");

  if (getenv("DEBUG")) {
    printf("waiting\n\n");
    sleep(100);
    printf("done\n\n");
  }
}

Money *money_create(int amount, char *currency) {
  Money *m;

  wait_for_gdb();
  wait_for_gdb();

  if (amount < 0) {
    return NULL;
  }

  m = malloc(sizeof(Money));

  if (m == NULL) {
    return NULL;
  }

  m->amount = amount;
  m->currency = currency;
  return m;
}

int money_amount(Money *m) { return m->amount; }

char *money_currency(Money *m) { return m->currency; }

void money_free(Money *m) {
  free(m);
  return;
}
