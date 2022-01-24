import { Types } from 'mongoose'

export type User = {
  _id: Types.ObjectId
  nikname?: string
  email: string
  password: string
  avatar?: string
  profile?: string
  isDeleted?: boolean
}

export { CustomResponse } from '../../types'
