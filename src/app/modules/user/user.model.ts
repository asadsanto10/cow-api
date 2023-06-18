import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { IUser, UserModel } from './user.interface';
import { userRole } from './user.variable';

const userSchema = new Schema<IUser>(
	{
		phoneNumber: { type: 'string', required: true, unique: true },
		role: { type: 'string', required: true, enum: userRole },
		password: { type: 'string', required: true },
		name: {
			firstName: { type: 'string', required: true },
			lastName: { type: 'string', required: true },
		},
		address: { type: 'string', required: true },
		budget: { type: 'number', required: true },
		income: { type: 'number', required: true },
	},
	{ timestamps: true }
);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
	const isExist = await this.$model('Users').findOne({
		phoneNumber: this.phoneNumber,
	});
	if (isExist) {
		throw new ApiError(httpStatus.CONFLICT, 'Phone number is already exists!');
	}
	next();
});

export const User = model<IUser, UserModel>('Users', userSchema);
