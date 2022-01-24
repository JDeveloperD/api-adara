import mongoose from 'mongoose'
import chalk from 'chalk'

async function connection (uri) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  }

  await mongoose.connect(uri, options)
    .then(() => {
      console.info(`✔️  [DATABASE] => ${chalk.bgGreen.black(`MongoDB: ${uri}`)}`)
      // console.info(mongoose.models)
    }).catch(err => {
      console.error(`🔥 [DATABASE] => ${chalk.bgRed.black(`Oh!!! ocurrió un error con MongoDB razón: ${err}`)}`)
    })
}

export { connection }
