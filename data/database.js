import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    const { connection } = await connect(process.env.MONGODB_URI, {
      dbName: 'Ecommerce'
    });
    console.log(`Server connected to database ${connection.host}`);
  } catch (error) {
    console.log('Some Error occurred while connecting to MongoDB server', error);
    process.exit(1);
  }
}