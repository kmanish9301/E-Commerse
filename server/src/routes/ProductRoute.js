import express from "express";

const router = express.Router();

router.get("/v1/getAllProducts", getAllProducts);

export default router;
