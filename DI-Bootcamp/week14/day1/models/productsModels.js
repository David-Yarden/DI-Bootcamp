import pool from "../db.js";

export const getAllProducts = async(req,res) => {
    try {
        const result = await getAllProductsFromDB();
        res.json(result.rows);
    }catch (error) {
        res.status(404).json({message:'not found'});
    }
    return pool.query("SELECT * FROM products");
};