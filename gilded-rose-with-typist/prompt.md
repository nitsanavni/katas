@./mutation_test.py

instead of file.write()
let's use os.system("cp file1 file2")
first thing: save a copy of the original file
then restore it by cp file2 file1
