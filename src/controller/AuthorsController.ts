import { Request, Response } from "express"
import { getRepository} from "typeorm"
import * as bcrypt from "bcrypt"
import { Authors } from "../entity/Authors"


export default {
  async index(_:Request, response: Response) {
    try {
      const authors = await getRepository(Authors).find()
      return response.status(200).json(authors)
    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async create(request: Request, response: Response) {
    try {
      const {
        file,
        body: { 
          name, 
          email,
          password
        }
      } = request

      const { type } = request.params;

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const author = await getRepository(Authors).save({
        name,
        email,
        password: hash,
        avatar: `${type}/${file.filename}`
      })

      return response.status(201).json(author)

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