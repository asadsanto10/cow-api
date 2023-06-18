import mongoose, { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/pagination.helper';
import { ICow, ICowsFilter, IGenericResponse, IPageOtions } from './cow.interface';
import { Cow } from './cow.model';
import { cowSearchTerm } from './cow.variable';

const createCow = async (userData: ICow): Promise<ICow | null> => {
	const result = await Cow.create(userData);
	if (!result) {
		throw new Error('Failed to create new cows');
	}
	return result;
};

const getAllCows = async (
	pageOptions: IPageOtions,
	filter: ICowsFilter
): Promise<IGenericResponse<ICow[]>> => {
	const options = calculatePagination(pageOptions);
	const page = options.page as number;
	const limit = options.limit as number;
	const skip = options.skip as number;

	const sortCondition: { [key: string]: SortOrder } = {};
	const { sortBy, sortOrder } = options;

	const { minPrice, maxPrice, searchTerm, ...filterData } = filter;

	const query = [];

	const priceFilter: { [key: string]: unknown } = {};

	if (searchTerm) {
		query.push({
			$or: cowSearchTerm.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	if (Object.keys(filterData).length) {
		query.push({
			$and: Object.entries(filterData).map(([field, value]) => ({
				[field]: value,
			})),
		});
	}

	if (minPrice) {
		priceFilter.$gte = Number(minPrice);
	}
	if (maxPrice) {
		priceFilter.$lte = Number(maxPrice);
	}

	if (Object.keys(priceFilter).length) {
		query.push({
			price: { ...priceFilter },
		});
	}

	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	}

	const queryCondition = query.length > 0 ? { $and: query } : {};

	const result = await Cow.find(queryCondition).sort(sortCondition).skip(skip).limit(limit);

	const total = await Cow.countDocuments(queryCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getCowById = async (id: string): Promise<ICow[] | null> => {
	const result = await Cow.find({
		_id: new mongoose.Types.ObjectId(id),
	});
	return result;
};

const updateCowById = async (id: string, payload: Partial<ICow>): Promise<ICow | null> => {
	const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

const deleteCowById = async (id: string): Promise<ICow | null> => {
	const result = await Cow.findByIdAndDelete(id);
	return result;
};

export const cowService = { createCow, getAllCows, getCowById, updateCowById, deleteCowById };
