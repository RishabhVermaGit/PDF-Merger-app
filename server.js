// run npm init -y on terminal to create further work with node modules.
// Using this package.json is create and folder is initialized node js project folder.

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000
import {mergePdfs} from './merge.js';


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"templates/index.html")) //serving an html file
})

app.post('/merge', upload.array('pdfs', 12), async function (req, res, next) {
    console.log(req.files.length)
    let arg = []
    for(let i = 0; i<req.files.length; i++){
        arg.push(path.join(__dirname,req.files[i].path))
    }
    let d = await mergePdfs(arg)
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
  })

app.listen(port, () => {
    console.log('Example app listening on port http://localhost:'+port)
})