import FavoriteModel from "../models/Favorite.Model.js";
export default class FavoriteController {
    static async addFavorite(req, res){
        try {
            const favoriteData = req.body;
            const result = await FavoriteModel.addFavorite(favoriteData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al agregar el favorito." });
        }
    }
    static async getAllFavorites(req, res){
        try {
            const favorites = await FavoriteModel.getAllFavorites();
            return favorites.success ? res.status(200).json(favorites) : res.status(404).json(favorites);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener los favoritos." });
        }
    }
    static async removeFavorite(req, res){
        try {
            const { id } = req.params;
            const result = await FavoriteModel.removeFavorite(id);
            return result.success ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al eliminar el favorito." });
        }
    }   
    static async getFavoritesByUserId(req, res){
        try {
            const { userID } = req.params;
            const favorites = await FavoriteModel.getFavoritesByUserId(userID);
            return favorites.success ? res.status(200).json(favorites) : res.status(404).json(favorites);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener los favoritos del usuario." });
        }
    }
}