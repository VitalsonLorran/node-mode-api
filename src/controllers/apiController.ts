import { Request, Response} from 'express'
import { Phrase } from '../models/Phrase'


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

    let phrase = Phrase.build({ author, txt})
    console.log(phrase)
    await phrase.save()
    res.json({ ok: "ok?"})
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