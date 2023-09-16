import os
import subprocess
import unittest


class Approval:
    def __init__(self, base_name):
        self._base_name = base_name

    @property
    def approved_file_path(self):
        return f"{self._base_name}.approved"

    @property
    def received_file_path(self):
        return f"{self._base_name}.received"

    def approved_text(self):
        if not os.path.exists(self.approved_file_path):
            with open(self.approved_file_path, "w") as file:
                file.write("")
            return ""

        with open(self.approved_file_path, "r") as file:
            return file.read()

    def update(self, received):
        with open(self.approved_file_path, "w") as file:
            file.write(received)

    def verify(self, received):
        approved = self.approved_text()

        if approved != received:
            with open(self.received_file_path, "w") as file:
                file.write(str(received))

            subprocess.run(
                ["code", "--diff", self.received_file_path, self.approved_file_path])
            return approved, received
        return None


class ApprovalTest(unittest.TestCase):
    def run_approval_test(self, test_method):
        base_name = f"{self.__class__.__name__}.{test_method.__name__}"
        approval = Approval(base_name)
        received = test_method()
        result = approval.verify(received)

        if result is not None:
            approved, received = result
            self.assertEqual(approved, received)

    def __call__(self, *args, **kwargs):
        test_methods = [method_name for method_name in dir(
            self) if method_name.startswith('test_')]
        for method_name in test_methods:
            test_method = getattr(self, method_name)
            with self.subTest(method_name):
                self.run_approval_test(test_method)
        return super().__call__(*args, **kwargs)
