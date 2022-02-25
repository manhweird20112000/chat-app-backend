import { Media } from '../../models';

const upload = async (payload, type = 'IMAGE') => {
	try {
		// let pathFile = path.indexOf('src');
		// console.log(pathFile);

		const media = new Media({
			type,
			size: payload.size,
			filename: payload.filename,
			path: payload.path,
			extension: payload.mimetype,
		});

		await media.save();

		return media._id;
	} catch (error) {
		throw new Error(error);
	}
};

const show = async (id) => {
	try {
		const image = await Media.findOne({ _id: id }).exec();

		return image;
	} catch (error) {
		throw new Error(error);
	}
};

export const MediaServices = { upload, show };
