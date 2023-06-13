import { app } from "./app.js";
import { connectDB } from './data/database.js';

connectDB();

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}, in ${process.env.NODE_ENV}mode`);
})
