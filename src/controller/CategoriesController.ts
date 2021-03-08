import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Categories } from "../entity/Categories"


export default {
  async index(_:Request, response: Response) {
    try {
      const categories = await getRepository(Categories)
      .find()

      return response.status(200).json(categories)
    }  catch (e){
      console.log(e);
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async create(request: Request, response: Response) {
    try {
      const {
        name
      } = request.body

      const category = await getRepository(Categories).save({
        name
      })

      return response.status(201).json(category)

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async update(request: Request, response: Response) {
    try {

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async delete(request: Request, response: Response) {
    try {

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

}