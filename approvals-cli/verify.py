from approvaltests.core.namer import Namer
from approvaltests import verify
import argparse

parser = argparse.ArgumentParser(description='verify')
parser.add_argument('--test-id', '-t', dest='id', required=True,
                    type=str, help='test id')
parser.add_argument('--received', '-r', type=str,
                    required=True, help='received')

args = parser.parse_args()


class CliNamer(Namer):
    def __init__(self, test_id: str) -> None:
        self.test_id = test_id

    def get_received_filename(self, base) -> str:
        return f"{self.test_id}.received.txt"

    def get_approved_filename(self, base) -> str:
        return f"{self.test_id}.approved.txt"

    def get_basename(self) -> str:
        return self.test_id


verify(args.received, namer=CliNamer(test_id=args.id))
