import os
import subprocess

# Create a temporary file
temp_file_path = 'temp_test_file.py'

# Write initial content to the temporary file
with open(temp_file_path, 'w') as temp_file:
    temp_file.write("The number is 42.\n")
    temp_file.write("Another line.\n")

# Execute mutation - replace '42' with '0'
subprocess.run(['python', 'mutate.py', '--file', temp_file_path,
               '--line', '1', '--pattern', '42', '--replacement', '0'])

# Clean up the temporary file
os.remove(temp_file_path)
