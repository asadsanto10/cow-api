import { Model } from 'mongoose';

export type TLocation =
	| 'Dhaka'
	| 'Chattogram'
	| 'Barishal'
	| 'Rajshahi'
	| 'Sylhet'
	| 'Comilla'
	| 'Rangpur'
	| 'Mymensingh';

export type TCowBreed =
	| 'Brahman'
	| 'Nellore'
	| 'Sahiwal'
	| 'Gir'
	| 'Indigenous'
	| 'Tharparkar'
	| 'Kankrej';

export type TCowCategory = 'Dairy' | 'Beef' | 'DualPurpose';

export interface ICow {
	name: string;
	age: number;
	price: number;
	location: TLocation;
	breed: TCowBreed;
	weight: number;
	label: string;
	category: TCowCategory;
	seller: string;
}

export type CowModel = Model<ICow, Record<string, unknown>>;

export interface IPageOtions {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}
export interface ICowsFilter {
	minPrice?: number;
	maxPrice?: number;
	location?: string;
	searchTerm?: string;
}

export interface IGenericResponse<T> {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
	};
}
