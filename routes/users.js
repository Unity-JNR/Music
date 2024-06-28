import express from 'express';
import controller from '../controller/user.js'

const router = express.Router()

router.route('/')
     .post(controller.adduser)
     .get(controller.getallusers)   
     


    router.route('/:id')
          .get(controller.getoneuser) 
          .patch(controller.edit)
          .delete(controller.delete)

    export default router   