const router= require('express').Router();
const multer= require('multer');
const PostTache= require('../Controllers/PostTache.controllers')
const TacheModel= require('../Models/Tache.models')
const { checkAuth } = require("../middlewares/ckeckAuth");

router.get('/tache/get', checkAuth, PostTache.Geter)
router.get('/tache/:id', checkAuth, PostTache.Geters )
router.post('/tache/post', checkAuth, PostTache.Poster)
router.post('/tache/postfolder', checkAuth, PostTache.PosterFolder)
router.put('/tache/:id', checkAuth, PostTache.Update)
router.delete('/tache/:id', checkAuth, PostTache.Delete)
router.patch('/tache/like/:id', checkAuth, PostTache.Like)
router.patch('/tache/unlike/:id', checkAuth, PostTache.Unlike)

//uploader les fichiers images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/public/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    TacheModel.findByIdAndUpdate(
        req.body.tacheId,
        {$set: {picture:"./images/public/image/" + req.file.filename}},
        {new: true, upsert: true, setDefaultsOnInsert: true},
        (err, docs)=>{
            if(!err) return res.send(docs)
            else return res.status(500).send({message: err})
        })
    
});

module.exports= router