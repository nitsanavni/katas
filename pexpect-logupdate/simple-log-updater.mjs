import logUpdate from "log-update";

setInterval(
  (
    (n = 1) =>
    () =>
      logUpdate(1 * ++n)
  )(),
  1000
);

setTimeout(() => {
  clearInterval(interval);
}, 10000);
