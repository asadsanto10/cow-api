/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

export const createUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as IUser;
		const result = await userService.createUser(data);
		// res.status(200).json({ status: 'success', data: result });
		sendResponse<IUser>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'user create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllUsers: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const result = await userService.getAllUser();
		sendResponse<IUser[]>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'user fetched successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getUserById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await userService.getUserById(id);
		sendResponse<IUser[]>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'user fetched successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const updateData = req.body as Partial<IUser>;

		const result = await userService.updateUserById(id, updateData);
		sendResponse<IUser>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'user updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await userService.deleteUser(id);
		sendResponse<IUser>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'user deleted successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
