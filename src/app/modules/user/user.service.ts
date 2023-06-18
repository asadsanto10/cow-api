/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser): Promise<IUser | null> => {
	const user = await User.create(userData);
	if (!user) {
		throw new Error('Failed to create user');
	}
	return user;
};

const getAllUser = async (): Promise<IUser[] | null> => {
	const result = await User.find(
		{},
		{
			password: 0,
			__v: 0,
		}
	);
	return result;
};

const getUserById = async (id: string): Promise<IUser[] | null> => {
	const result = await User.find(
		{
			_id: new mongoose.Types.ObjectId(id),
		},
		{
			password: 0,
			__v: 0,
		}
	);
	return result;
};

const updateUserById = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
	const result = await User.findOneAndUpdate({ _id: id }, payload, {
		new: true,
		projection: { password: 0, __v: 0 },
	});
	return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
	const result = await User.findByIdAndDelete(id);
	return result;
};

export const userService = { createUser, getAllUser, getUserById, updateUserById, deleteUser };
