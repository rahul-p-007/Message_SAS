import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

export async function Signup(req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter all fileds",
      });
    }

    const userAlreadyexist = await User.findOne(email);
    if (userAlreadyexist) {
      return res.status(400).json({
        success: false,
        message: "User alreasy exist",
      });
    }
    const passwordSchema = z
      .string()
      .min(5, "Enter minimum five character")
      .max(15, "Can enter upto 15 character")
      .regex(/[A-Z]/, "Enter aleast one Uppercase letter")
      .regex(/[a-z]/, "Enter aleast one smaller case character")
      .regex(/\d/, "Enter at least one number")
      .regex(/[@#$%&?]/, "Enter alteast one special character");

    const UserValidationSchema = z.object({
      fullName: z.string(),
      email: z.string().email(),
      password: passwordSchema,
    });
    const UserValidated = UserValidationSchema.safeParse({
      fullName,
      email,
      password,
    });
    if (!UserValidated.success) {
      return res.status(400).json({
        success: false,
        message: "Enter the feild in correct order",
        error: UserValidated.error.errors[0].message,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    const token = jwt.sign();
    return res.json({
      success: true,
      message: "User successfully created😊",
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error will connecting to server",
      error,
    });
  }
}
export function Login(req, res) {
  res.send("Login route");
}
export function Logout(req, res) {
  res.send("Logout route");
}
