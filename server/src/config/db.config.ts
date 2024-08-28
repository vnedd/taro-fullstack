import mongoose from 'mongoose';
export default async function connectMongoDB(dbUrl: string) {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
}
