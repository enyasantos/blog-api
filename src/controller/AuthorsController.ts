import { Request, Response } from "express"
import { getRepository} from "typeorm"
import * as bcrypt from "bcrypt"
import { Authors } from "../entity/Authors"
import DeleteFile from "./utils/deleteFile"

interface Author {
  avatar?: string,
  name: string,
  email: string, 
  password: string,
}

export default {
  async index(_:Request, response: Response) {
    try {
      const authors = await getRepository(Authors).find()
      return response.status(200).json(authors)
    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async show(request:Request, response: Response) {
    try {
      const { id } = request.params

      const author = await getRepository(Authors)
      .findOne({
        relations: ['posts'],
        where: { id }
      })

      return response.status(200).json(author)
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
      const { id, type } = request.params

      const {
        file,
        body: { 
          name, 
          email,
          password
        }
      } = request

      const { avatar } =  await getRepository(Authors).findOne(id);
      
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const data: Author = {
        name,
          email,
          password: hash,
          avatar: file ? `${type}/${file.filename}` : avatar,
      }

      const author = await getRepository(Authors).update(id, data)

      if(author.affected === 1) {
        const authorUpdated =  await getRepository(Authors).findOne(id)

        if(data.avatar !== avatar)
          DeleteFile(avatar);

        return response.status(200).json(authorUpdated)
      }

      return response.status(404).json({ message: "Author not found!"})

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

  async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params

      const { avatar } =  await getRepository(Authors).findOne(id)
      const author = await getRepository(Authors).delete(id)

      if(author.affected === 1) {
        DeleteFile(avatar);
        return response.status(204).json({ message: "Author removed!"})
      }

      return response.status(404).json({ message: "Author not found!"})

    }  catch {
      return response.status(500).json({ message: "Internal Error"})
    }
  },

}