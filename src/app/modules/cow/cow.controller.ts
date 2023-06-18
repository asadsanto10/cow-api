import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ICow, ICowsFilter, IPageOtions } from './cow.interface';
import { cowService } from './cow.service';
import { cowFilterField, paginationField } from './cow.variable';

export const createCow: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as ICow;
		const result = await cowService.createCow(data);
		sendResponse<ICow>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Cow created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllCows: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const pageOtions: IPageOtions = pick(req.query, paginationField);
		const filter: ICowsFilter = pick(req.query, cowFilterField);

		const result = await cowService.getAllCows(pageOtions, filter);

		sendResponse<ICow[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Cows fetch successfully',
			data: result.data,
			meta: result.meta,
		});
	} catch (error) {
		next(error);
	}
};

export const getCowById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await cowService.getCowById(id);
		sendResponse<ICow[]>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Cow fetched successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateCowById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const updateData = req.body as Partial<ICow>;

		const result = await cowService.updateCowById(id, updateData);
		sendResponse<ICow>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Cow updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteCowById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await cowService.deleteCowById(id);
		sendResponse<ICow>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Cow deleted successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
