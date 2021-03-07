import { Posts } from '../entity/Posts';

import { slug } from "../utils/slug";

export default {
    render(post: Posts) {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            category: post.category,
            author: post.author,
            slug: slug(post.title),
            image_url: `http://localhost:3008/media/${post.image}`,
            visible: post.visible,
            created_at: post.created_at,
            updated_at: post.updated_at
        }
    },

    renderMany(posts: Posts[]) {
        return posts.map(post => this.render(post))
    }
}
