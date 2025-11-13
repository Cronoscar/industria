import CategoryModel from "../models/CategoryModel.js";

export default class CategoryController {
    // GET /api/categories - Obtener todas las categorias
    static getAllCategories(req, res){
        try {
            const categories = CategoryModel.getAll();
            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener personas',
                error: error.message
            });
        }
    }

    // GET /api/categories/:id - Obtener una categoria por ID
    static getCategoryById(req, res){
        try {
            const category = CategoryModel.getById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Categoria no encontrada",
                });
            }
            res.status(200).json({
                success: true,
                data: category,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener categoria",
                error: error.message,
            });
        }
    }

    // POST /api/categories - Crear nueva categoria
    static createCategory(req, res) {
        try {
            const { name, description } = req.body;

            if (!name || !description) {
                return res.status(400).json({
                    success: false,
                    message: "Todos los campos son requeridos",
                });
            }

            const newCategory = new CategoryModel(name, description);
            res.status(201).json({
                success: true,
                message: "Categoria creada exitosamente",
                data: newCategory,
            });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Error al crear categoria",
            error: error.message,
          });
        }
    }

    // PUT /api/categories/:id - Actualizar categoria
    static updateCategory(req, res) {
        try {
            const { name, description } = req.body;
            const id = parseInt(req.params.id);
            const categoryData = new CategoryModel(name, description);
            const updatedCategory = CategoryModel.update(id, categoryData);
            if (!updatedCategory) {
                return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Categoria actualizada exitosamente',
                data: updatedCategory
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar categoria',
                error: error.message
            });
        }
    }

    // DELETE /api/categories/:id - Eliminar categoria
    static deleteCategory(req, res) {
        try {
            const id = parseInt(req.params.id);
            const deleted = CategoryModel.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Categoria no encontrada'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Categoria eliminada exitosamente',
                data: deleted
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar categoria',
                error: error.message
            });
        }
    }
}