import { Pool } from "../structs/pool.js";
import { Djb2Hasher } from "../structs/djb2.js";

export const djb2Pool = new Pool(Djb2Hasher, { size_limit: 8 });
