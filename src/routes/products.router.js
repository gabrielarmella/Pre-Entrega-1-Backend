import { Router } from "express";
import  ProductManager  from "../managers/ProductManager.js";
const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.post("/:cid/ingredients/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartManager.addOneIngredient(cid, pid, quantity || 1);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});


export default router;