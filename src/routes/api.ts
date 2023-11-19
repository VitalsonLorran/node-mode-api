import { Router } from "express";
import * as ApiController from '../controllers/apiController'
import multer from "multer";


// const storageConfig = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './tmp')
//     },
//     filename: (req, file, cb) => {
//         let randomName = Math.floor(Math.random() * 99999999)
//         cb(null, `${randomName+ '-' +Date.now()}.png`)
//     }
// })
// const upload = multer({
//     storage: storageConfig
// })

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
        cb(null, allowed.includes( file.mimetype))
        
        console.log("INFORMACOES", file)
    }
})

const router = Router() 

router.get('/ping', ApiController.ping)
router.get('/random', ApiController.random)
router.get('/nome/:nome', ApiController.name)

router.post('/frases', ApiController.createPhrase)
router.get('/frases', ApiController.getPhrases)
router.get('/frases/aleatoria', ApiController.randomPhrase)
router.get('/frases/:id', ApiController.getOnePhrase)
router.put('/frases/:id', ApiController.updatePhrase)
router.delete('/frases/:id', ApiController.deletePhrase)
router.post('/upload', upload.single('avatar'), ApiController.uploadFile)
// router.post('/upload', upload.fields([
//     { name: 'avatar', maxCount: 1},
//     { name: 'gallery', maxCount: 3}
// ]), ApiController.uploadFile)

export default router