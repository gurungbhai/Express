import { Response, Request } from "express";
import { User } from "../entity/User";


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
    try {
        // Find the user by ID
        const user = await User.findOneBy({ id: parseInt(req.params.id) });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Merge the request body with the found user
        const updatedUser = User.merge(user, req.body);

        // Save the updated user back to the database
        const result = await User.save(updatedUser);

        // Return the updated user
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id) });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const result = await User.delete(req.params.id);
        res.json({ msg: 'user has been delete' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}