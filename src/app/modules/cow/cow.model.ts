import { Schema, model } from 'mongoose';

import { CowModel, ICow } from './cow.interface';
import { cowBreed, cowCategory, location } from './cow.variable';

const cowSchema = new Schema<ICow>(
	{
		name: { type: 'string', required: true },
		age: { type: 'number', required: true },
		price: { type: 'number', required: true },
		location: { type: 'string', required: true, enum: location },
		breed: { type: 'string', required: true, enum: cowBreed },
		weight: { type: 'number', required: true },
		label: { type: 'string', required: true },
		category: { type: 'string', required: true, enum: cowCategory },
		seller: { type: 'string', required: true },
	},
	{ timestamps: true }
);

export const Cow = model<ICow, CowModel>('Cows', cowSchema);
