import { Request, Response} from 'express'
import { Phrase } from '../models/Phrase'
import { Sequelize } from 'sequelize'


export const ping = async (req: Request, res: Response) => {
    //let frases = await Phrase.findAll()
    //console.log(frases)
    res.json({pong: true})
}
export const random = (req:Request, res:Response) => {
    let nRand: number = Math.floor( Math.random() * 10)

    res.json({number: nRand})}

export const name = (req:Request, res:Response) => {
    let nome: string = req.params.nome
    res.json({nome})
    console.log(nome)
}

export const createPhrase = async (req: Request, res: Response) => {
    
    let { author, txt } = req.body
    let newPhrase = await Phrase.create( { author, txt })
    res.status(201)
    res.json({ id: newPhrase.id, author, txt })
    // let phrase = Phrase.build({ author, txt})
    // console.log(phrase)
    // await phrase.save()
    // res.json({ ok: "ok?"})
    // try {
    //     let { author } = req.body
    //     const  newPhrase = Phrase.create( { author})
    //     /*
    //     await newPhrase.save()
    
    //     if (author) {
    //         const newPhrase = Phrase.build({ author })
    //         if (txt) {
    //             newPhrase.txt = txt
    //         }

    //         res.json( { author })
    //     }*/

    // } catch (error) {
    //     console.log('deu erro')    
    // }
    

}

export const getPhrases =async (req: Request, res:Response) => {
        let frases = await Phrase.findAll()
        console.log(frases)
        res.json(frases)
}

export const getOnePhrase =async (req:Request, res:Response) => {
    
    let frase = await Phrase.findByPk(req.params.id)
    if (frase) {
        console.log(frase.txt)
        res.status(200)
        res.json({ frase: frase.txt })
    } else {
        res.status(404)
        res.json({ error: 'Frase nao encontrada'})
    }
}

export const updatePhrase =async (req:Request, res:Response) => {
    let { id } = req.params
    let { author, txt } = req.body
    let phrase = await Phrase.findByPk(id)
    if (phrase) {
        phrase.author = author
        phrase.txt = txt
        await phrase.save()
        res.json({ phrase })
    } else {
        res.json({ error: 'Frase nao encontrada'})

    }

}

export const deletePhrase =async (req:Request, res:Response) => {
    
    let { id } = req.params

    await Phrase.destroy({ where: {id}})

    res.json({})
}

export const randomPhrase =async (req:Request, res: Response) => {
    let phrase = await Phrase.findOne({
        order: [
            Sequelize.fn('RAND')
        ]
    })

    if(phrase) {
        res.json(phrase)
    } else{
        res.json({ error: 'Não há frases cadastradas.' })
    }
}
export const uploadFile =async (req:Request, res: Response) => {
    console.log( req.file )

    res.json({})
}