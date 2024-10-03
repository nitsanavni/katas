from generate_mutations import generate_mutations

if __name__ == "__main__":
    mutations = generate_mutations('gilded_rose.py')
    for mutation in mutations:
        print(mutation[0], mutation[1], mutation[2])
