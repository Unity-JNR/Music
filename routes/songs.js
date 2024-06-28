import express from 'express';
import controller from '../controller/music.js'

const router = express.Router()

router.route('/')
     .post(controller.addsong)
     .get(controller.getallsongs)   
     


    router.route('/:id')
          .get(controller.getsong) 
          .patch(controller.updatesong)
          .delete(controller.deletesong)

    export default router   