import sys
from functools import wraps


class Monitor:
    def __init__(self, local):
        self.local = local
        self.log = []

    def clear_log(self):
        self.log.clear()

    def __call__(self, func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            def trace(frame, event, arg):
                if event == "line":
                    locals = frame.f_locals
                    if self.local in locals:
                        current_value = locals[self.local]
                        if not self.log or self.log[-1][1] != current_value:
                            self.log.append((frame.f_lineno, current_value))
                return trace

            old_trace = sys.gettrace()
            sys.settrace(trace)
            try:
                result = func(*args, **kwargs)
            finally:
                sys.settrace(old_trace)
            return result

        wrapped.log = self.log
        wrapped.clear_log = self.clear_log
        return wrapped


@Monitor(local="a")
def test_function(x):
    a = ""
    for i in range(3):
        x += i
        a += str(x)
        print(x)


test_function(5)
print(test_function.log)  # Access the log of 'x'
test_function.clear_log()
test_function(1)
print(test_function.log)  # Access the log of 'x'
