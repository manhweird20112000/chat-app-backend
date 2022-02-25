import multer from 'multer';
import fs from 'fs';
import { v4 } from 'uuid';
import path from 'path';
import { DISK_MEDIA } from '../constants';

export const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			if (!fs.existsSync(DISK_MEDIA)) {
				fs.mkdirSync(DISK_MEDIA);
			}

			callback(null, DISK_MEDIA);
		},

		filename: (req, file, callback) => {
			callback(null, v4() + path.extname(file.originalname));
		},

		fileFilter: (req, file, callback) => {
			let ext = path.extname(file.originalname);
			if (
				ext !== '.png' &&
				ext !== '.jpg' &&
				ext !== '.gif' &&
				ext !== '.jpeg'
			) {
				return callback(/*res.end('Only images are allowed')*/ null, false);
			}
			callback(null, true);
		},
	}),
});
