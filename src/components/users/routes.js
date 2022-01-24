// @ts-check
import { Router } from 'express'
import * as UserController from './controller'

const router = Router()

router.get('/', UserController.index)
router.get('/search', UserController.search)
router.get('/:id', UserController.getById)
router.post('/', UserController.create)
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.remove)

export default router
