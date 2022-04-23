import firebaseCloundMesssage from 'fcm-node';
import { env } from '../../utils/helper.utils';

const serverKey = env('FCM_SERVER_KEY');
const fcm = new firebaseCloundMesssage(serverKey);

const message = {
	to: '',
	collapse_key: '',

	notification: {
		title: 'Thông báo',
		body: 'Lõi thông báo',
	},
	data: {
		my_key: '',
		my_another_key: '',
	},
};

fcm.send(message, function (error, response) {
	if (error) {
		console.log(error);
	}
});
