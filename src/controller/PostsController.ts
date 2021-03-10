import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Posts } from "../entity/Posts"
import postView from "../view/post_view"
import DeleteFile from "./utils/deleteFile"

interface Post {
    image?: string,
    title: string,
    content: string,
    category: (() => string)
}

export default {
    async index (_:Request, response: Response) {
        try {
            const posts = await getRepository(Posts)
            .find()
            return response.json(posts)
        } catch {
            return response.status(500).json({ message: "Internal Error"})
        }
    },

    async create (request: Request, response: Response) {
        try {
            const {
                file,
                body: { title, content, category, author }
            } = request

            const { type } = request.params;

            const post = await getRepository(Posts).save({
                title,
                content,
                category,
                author,
                image: `${type}/${file.filename}`
            })

            return response.status(201).json(post)
            
        } catch {
            return response.status(500).json({ message: "Internal Error"})
        }
    },

    async destroy (request: Request, response: Response) {
        try {
            const { id } = request.params

            const { image } = await getRepository(Posts).findOne(id)
            const post = await getRepository(Posts).delete(id)

            if(post.affected === 1) {
                DeleteFile(image);
                return response.status(204).json({ message: "Post removed!"})
            }

            return response.status(404).json({ message: "Post not found!"})

        } catch {
            return response.status(500).json({ message: "Internal Error"})
        }
    },

    async show (request: Request, response: Response) {
        try {
            const { id } = request.params
            const post = await getRepository(Posts).findOne(id)

            return response.json(postView.render(post))
        } catch {
            return response.status(500).json({ message: "Internal Error"})
        }
    },

    async search(request: Request, response: Response) {
        try {
            const { search } = request.query

            const posts = await getRepository(Posts)
            .createQueryBuilder()
            .select()
            .where('content ILIKE :search', {search: `%${search}%`})
            .getMany();

            return response.json(postView.renderMany(posts))
        } catch {
            return response.status(500).json({ message: "Internal Error"})
        }
    },

    async update (request: Request, response: Response) {
        try {
            const { id, type } = request.params

            const {
                file,
                body: { title, content, category }
            } = request

            const { image } = await getRepository(Posts).findOne(id)

            const data: Post = {
                title,
                content,
                category,
                image: file ? `${type}/${file.filename}` : image
            }

            const post = await getRepository(Posts).update(id, data)
        
            if(post.affected === 1) {
                const postUpdated = await getRepository(Posts).findOne(id)

                if(data.image !== image)
                    DeleteFile(image);

                return response.json(postUpdated)
            }
        
            return response.status(404).json({ message: "Post not found!"})
        } catch {
            return response.status(500).json({ message: "Internal Error"})
        }
    },

    async visiblePost (request: Request, response: Response) {
        try {
            const {id} = request.params

            const { visible } = request.body

            const postCurrent = await getRepository(Posts).update(id, {
                visible: visible
            })
    
            if(postCurrent.affected === 1) {
                await getRepository(Posts).findOne(id)
                return response.json({ message: "Post visible updated!"})
            }
    
        } catch {
            return response.status(404).json({ message: "Post not found!"})
        }
    }
}
