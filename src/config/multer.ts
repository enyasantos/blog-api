import { Options, diskStorage } from "multer"
import { resolve } from "path"
import { randomBytes } from "crypto"

export const multerConfig = {
    dest: resolve(__dirname, "..", "..", "uploads"),
    storage: diskStorage({
        destination: (request, file, callback) => {
            const { type } = request.params;
            callback(null, resolve(__dirname, "..", "..", "uploads", type))
        },
        filename: (request, file, callback) => {
            randomBytes(16, (error, hash) => {
                if(error)
                    callback(error, file.filename)
                const filename = `${hash.toString('HEX')}-${file.originalname}`
                callback(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 8 * 1024 * 1024 // max 8MB
    },
    fileFilter: (request, file, callback) => {
        const formats = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];

        if(formats.includes(file.mimetype))
            callback(null, true)
        else
            callback(new Error("Format not accepted."))
        
    }
} as Options