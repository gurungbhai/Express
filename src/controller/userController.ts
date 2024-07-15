import { Response, Request } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUsers = async (_req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = User.create(req.body);
        const result = await User.save(user);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10); // Convert req.params.id to a number
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await User.findOneBy({ id: userId }); // Use findOneBy to find user by primary key
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
    // const user = await User.findOneOrFail(req.params.id);
    // res.json(user);
}

export const updateUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    //     const user = await User.findOneOrFail(userId);
    //     User.merge(user, req.body);
    //     const result = await User.save(user);
    //     res.json(result);
}

export const deleteUser = async (req: Request, res: Response) => {
    const result = await User.delete(req.params.id);
    res.json(result);
}

export const login = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneBy({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };