from approvaltests import verify
import argparse

parser = argparse.ArgumentParser(description='verify')
parser.add_argument('--test-id', '-t', dest='id', required=True,
                    type=str, help='test id')
parser.add_argument('--received', '-r', type=str,
                    required=True, help='received')

args = parser.parse_args()

print(args.id)
print(args.received)
