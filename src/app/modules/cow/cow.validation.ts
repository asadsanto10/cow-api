import { z } from 'zod';
import { cowBreed, cowCategory, location } from './cow.variable';

const createCowZodSchema = z.object({
	body: z.object({
		name: z.string({ required_error: 'Name number is required' }),
		age: z.number({ required_error: 'Age is required' }),
		price: z.number({ required_error: 'Price is required' }),
		location: z.enum([...location] as [string, ...string[]], {
			required_error: 'Location is required',
		}),
		breed: z.enum([...cowBreed] as [string, ...string[]], { required_error: 'Breed is required' }),
		weight: z.number({ required_error: 'Weight is required' }),
		label: z.string({ required_error: 'Label is required' }),
		category: z.enum([...cowCategory] as [string, ...string[]], {
			required_error: 'Category is required',
		}),
		seller: z.string({ required_error: 'Seller is required' }),
	}),
});

const updateCowZodSchema = z.object({
	body: z.object({
		name: z.string({ required_error: 'Name number is required' }).optional(),
		age: z.number({ required_error: 'Age is required' }).optional(),
		price: z.number({ required_error: 'Price is required' }).optional(),
		location: z
			.enum([...location] as [string, ...string[]], {
				required_error: 'Location is required',
			})
			.optional(),
		breed: z
			.enum([...cowBreed] as [string, ...string[]], { required_error: 'Breed is required' })
			.optional(),
		weight: z.number({ required_error: 'Weight is required' }).optional(),
		label: z.string({ required_error: 'Label is required' }).optional(),
		category: z
			.enum([...cowCategory] as [string, ...string[]], {
				required_error: 'Category is required',
			})
			.optional(),
		seller: z.string({ required_error: 'Seller is required' }).optional(),
	}),
});

export const cowValidation = { createCowZodSchema, updateCowZodSchema };
