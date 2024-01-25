import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/model/user.model";
import { compare } from "bcrypt";

export async function POST(request: Request, response:Response) {
  try {
    const {email, password} = await request.json()
    console.log({email, password})

    const hashedPassword = await hash(password, 10)
    //db connections
    await connectToDatabase();
    const person = new User({
      email:email, 
      password:hashedPassword
    })
    await person.save()
    // const passwordCorrect = await compare(
    //   password || '',
    //   person.password
    // );
    // console.log({ passwordCorrect });
    console.log("user created")
    //validations
  } catch(err) {
    console.log(err)
  }

  return NextResponse.json({message: 'success'})
}