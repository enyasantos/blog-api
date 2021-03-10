import * as fs from "fs"
import * as path from "path"

export default function DeleteFile(pathFile: string) {
  const p = path.resolve(__dirname, "..", "..", "..", "public", pathFile)
  fs.unlink(p, (err) => {
    if(err) {
      console.error(err);
      return;
    }
  })
} 