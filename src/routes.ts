import { Router } from "express"
import { multerConfig } from './config/multer'
import * as multer from "multer"
import PostsController from "./controller/PostsController"
import CategoriesController from "./controller/CategoriesController"
import AuthorsController from "./controller/AuthorsController"

const routes = Router()

routes.get("/search", PostsController.search)

routes.get("/posts", PostsController.index)
routes.get("/posts/:id", PostsController.show)
routes.post("/posts/:type", multer(multerConfig).single('file'), PostsController.create)
routes.put("/posts/:type/:id", multer(multerConfig).single('file'), PostsController.update)
routes.delete("/posts/:id", PostsController.destroy)
routes.patch('/posts/:id', PostsController.visiblePost)

routes.get("/categories", CategoriesController.index);
routes.get("/categories/:id", CategoriesController.show);
routes.post("/categories", CategoriesController.create);
routes.put("/categories/:id", CategoriesController.update)
routes.delete("/categories/:id", CategoriesController.destroy)

routes.get("/authors", AuthorsController.index)
routes.get("/authors/:id", AuthorsController.show);
routes.post("/authors/:type", multer(multerConfig).single('avatar'), AuthorsController.create)
routes.put("/authors/:type/:id", multer(multerConfig).single('avatar'), AuthorsController.update)
routes.delete("/authors/:id", AuthorsController.destroy)

export default routes
