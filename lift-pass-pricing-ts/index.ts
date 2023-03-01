import { createApp } from "./prices.js";

const { app } = await createApp();

const port =
    +(process.env.PORT || "3000") +
    +(process.env.STRYKER_MUTATOR_WORKER || "0");

app.listen(port, () => console.log(`listening on port ${port}`));
