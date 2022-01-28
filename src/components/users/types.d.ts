import { Types } from 'mongoose'

export type User = {
  _id: Types.ObjectId
  email: string
  password: string
  avatar?: string
  profile?: string
  isDeleted?: boolean
  createdAt?: Date,
	updatedAt?: Date,
}

export { CustomResponse } from '../../types'
