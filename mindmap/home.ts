import { Transform } from "./transform";

export const home: Transform = (nodes) =>
  nodes.map((n, i) =>
    i == 0 ? { ...n, selected: true } : { ...n, selected: false }
  );

export default home;
