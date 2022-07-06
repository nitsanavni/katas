import logUpdate from "log-update";

const interval = setInterval(
  (
    (n = 1) =>
    () => (logUpdate(`${n}\n${2 * n}\n${3 * n}`), n++)
  )(),
  1000
);

setTimeout(() => {
  clearInterval(interval);
}, 15000);
