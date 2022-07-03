import { Transform } from "./transform";

export const home: Transform = (nodes) => {
  const [first, ...rest] = nodes;

  if (!first) {
    return [];
  }

  return [
    { ...first, selected: true },
    ...rest.map(({ body, indentation }) => ({ body, indentation })),
  ];
};

export default home;
