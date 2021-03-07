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
routes.post("/categories", CategoriesController.create);

routes.get("/authors", AuthorsController.index)
routes.post("/authors/:type", multer(multerConfig).single('avatar'), AuthorsController.create)

export default routes
