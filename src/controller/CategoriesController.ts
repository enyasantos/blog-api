import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Categories } from "../entity/Categories"


export default {
  async index(_:Request, response: Response) {
    try {
      const categories = await getRepository(Categories)
      .find()

      return response.status(200).json(categories)
    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async show(request:Request, response: Response) {
    try {
      const { id } = request.params

      const category = await getRepository(Categories)
      .findOne({
        relations: ['posts'],
        where: { id }
      })

      return response.status(200).json(category)
    }  catch {
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
      const { id } = request.params

      const {
        name
      } = request.body

      const category = await getRepository(Categories).update(id, {
        name
      })

      if(category.affected === 1) {
        const categoryUpdated =  await getRepository(Categories).findOne(id)
        return response.status(200).json(categoryUpdated)
      }

      return response.status(404).json({ message: "Category not found!"})

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params

      const category = await getRepository(Categories).delete(id)

      if(category.affected === 1) {
        return response.status(204).json({ message: "Category removed!"})
      }

      return response.status(404).json({ message: "Category not found!"})

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

}