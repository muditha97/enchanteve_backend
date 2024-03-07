import express, { ErrorRequestHandler } from "express";
import { Category } from "../models/category";

const router = express.Router();

router.post('/', async(req, res) => {
    try {
      console.log(req);
      
        if (!req.body.name) {
            return res.status(400).send({
              message: "Send required details",
            });
          }

          const newCategory = {
            name: req.body.name,
          };
      
          const book = await Category.create(newCategory);
      
          return res.status(201).send(book);
        
    } catch (error:any) {
        console.log(error.message);
    res.status(500).send({ message: error.message });
    }
})

router.get('/', async(req,res) =>{
  try {
    const categories = await Category.find({})

    return res.status(200).json({
      count:categories.length,
      data:categories
    })
  } catch (error:any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    return res.status(200).json(category);
  } catch (error:any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Send required details",
      });
    }

    const { id } = req.params;
    const result = await Category.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error:any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error:any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;