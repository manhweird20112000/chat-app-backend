import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { v1 } from 'uuid';
import { env } from '../utils/helper.utils';

const storage = new GridFsStorage({
	url: `mongodb+srv://dinhvanmanh:dinhvanmanh@cluster0.qy1kp.mongodb.net/chat?retryWrites=true&w=majority`,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req, file) => {
		const match = ['image/png', 'image/jpeg'];

		if (match.indexOf(file.mimetype) === -1) {
			const filename = `${v1()}-hsweird-${file.originalname}`;
			return filename;
		}

		return {
			bucketName: 'photos',
			filename: `${v1()}-hsweird-${file.originalname}`,
		};
	},
});

export const upload = multer({ storage });
