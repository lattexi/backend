import express from "express";
import multer from "multer";
import { getItemById, getItems, postItem, putItem, deleteItem } from "../controllers/media-controller.js";

const upload = multer({ dest: "uploads/" });

const mediaRouter = express.Router();

mediaRouter.route("/")
    .get(getItems)
    .post(upload.single("file"), postItem);

mediaRouter
    .route("/:id")
    .get(getItemById)
    .put(upload.single("file"), putItem)
    .delete(deleteItem);

export default mediaRouter;
