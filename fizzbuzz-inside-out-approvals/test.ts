type Test = (name: string, printer: () => any) => void;

export const test: Test = (name, printer) => {
    console.log(`${name}`);
    console.log(`${printer()}`);
    console.log("");
};

export default test;
