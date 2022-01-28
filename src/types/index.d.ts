import { Response, Request, NextFunction, response } from 'express'

// Custom error
export interface HttpErrors {
  status: number
  message: string
}

// Custom response
export type ResponseType = {
  data?: null | Array<object> | object
  status?: number
  message?: string
}

export type FailType = {
  description?: string
  status?: number
  errors?: Array<string> | null | string
}

export type SuccessType = {
  data?: null | Array<object> | object
  message?: string
}

export type ErrorType = {
  description?: string
  errors: string | Array<string>
}

export interface CustomResponse extends Response {
  respond: (respondData: ResponseType) => {}
  fail: (failData: FailType) => {}
  respondCreated: (createdData: SuccessType) => {}
  respondDeleted: (deletedData: SuccessType) => {}
  respondUpdated: (updatedData: SuccessType) => {}
  respondNoContent: () => {}
  failUnauthorized: () => {}
  failForbidden: () => {}
  failNotFound: (message: string) => {}
  failValidationError: (errors: Array<string> | string) => {}
  failServerError: (serverError: ErrorType) => {}
}
