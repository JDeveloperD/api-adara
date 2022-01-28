// @ts-check
import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import bcrypt from 'bcrypt'

const PROFILES = ['super-admin', 'admin', 'moderator', 'user']

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required']
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    avatar: {
      type: String,
      default: '/uploads/avatars/default-avatar.jpg'
    },
    profile: {
      type: String,
      enum: {
        values: PROFILES,
        message: '{VALUE} no es un perfil de usuario'
      },
      default: 'user'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)

/**
 * Función para cifrar una contraseña con bcrypt
 * @param {string} password
 * @returns {Promise<string>}
 */
const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

/**
 * Función para comparar contraseñas
 * @param {string} password
 * @param {string} passwordReceived
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, passwordReceived) => {
  return await bcrypt.compare(passwordReceived, password)
}

UserSchema.plugin(paginate)

const UserModel = model('Users', UserSchema)

export { UserModel, encryptPassword, comparePassword, PROFILES }
