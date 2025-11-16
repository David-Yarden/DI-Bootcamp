// import knex from "knex";
import dotenv from "dotenv";
dotenv.config();
import {Pool} from "pg";

const {PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER} = process.env;

// console.log(PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER);
export const pool = new Pool({
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
});
const result1 = await pool.query('select * from products where od=$1', [2]);
// const db = knex({
//   client: "pg",
//   connection: {
//     host: PGHOST,
//     user: PGUSER,
//     password: PGPASSWORD,
//     database: PGDATABASE,
//     port: PGPORT,
//   },
// });

db("products")
    .insert([
        {name: "iPhone16"}, ["name","id"]
    ])
    .select("id", "name", "price")
    .where({id:2})
    .then((rows)=> console.log(rows))
    .catch((err)=> console.log(err));

const result = await db.raw("SELECT * FROM products WHERE id = ?", [2]);
console.log(result.rows);