import multer from 'multer';
import fs from 'fs';
import { v4 } from 'uuid';
import path from 'path';

export const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			if (!fs.existsSync('/uploads')) {
				fs.mkdirSync('/uploads');
			}

			callback(null, './uploads');
		},

		filename: (req, file, callback) => {
			callback(
				null,
				file.fieldname + '-' + v4() + path.extname(file.originalname)
			);
		},

		// fileFilter: (req, file, callback) => {
		// 	let ext = path.extname(file.originalname);
		// 	if (
		// 		ext !== '.png' &&
		// 		ext !== '.jpg' &&
		// 		ext !== '.gif' &&
		// 		ext !== '.jpeg'
		// 	) {
		// 		return callback(/*res.end('Only images are allowed')*/ null, false);
		// 	}
		// 	callback(null, true);
		// },
	}),
});
