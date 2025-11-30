import { Router } from "express";
import FavoriteController from "../controllers/Favorite.Controller.js";
const favoriteRouter = Router();    

favoriteRouter.post('/favorites', FavoriteController.addFavorite);
favoriteRouter.get('/favorites', FavoriteController.getAllFavorites);
favoriteRouter.delete('/favorites/:id', FavoriteController.removeFavorite);
favoriteRouter.get('/favorites/user/:userID', FavoriteController.getFavoritesByUserId);
export default favoriteRouter;