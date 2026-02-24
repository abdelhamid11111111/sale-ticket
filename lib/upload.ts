import { writeFile } from "fs/promises";
import { join } from "path";

export async function saveFile(file: File): Promise<string> {
    
    // 1. get file as binary 
    const binary = await file.arrayBuffer()

    // 2. turn it into node js friendly
    const buffer = Buffer.from(binary)

    // 3. generate name for file
    const timestamp = Date.now()
    const filename  = `${timestamp}-${file.name}`

    // 4. create path
    const path = join(process.cwd(), `/public/uploads`, filename)

    // 5. save file
    await writeFile(path, buffer)

    // 6. return file
    return `/uploads/${filename}`

}

// .arrayBuffer() its read file from binary data from browser

// Buffer is node js binary type, that's why its friendly

// join combine path parts like: join("a", "b", "c") -> a\b\c 

// process.cwd() its like pwd in CLI, means 'Current Working Directory'

// it return only /uploads/photo.jpg, and not full path, cuz browser cant access 