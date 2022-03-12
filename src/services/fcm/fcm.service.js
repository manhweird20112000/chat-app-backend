import { env } from '../../utils/helper.utils';
import fcmNode from 'fcm-node';

const SERVER_KEY = env('FCM_SERVER_KEY');

fcmNode.send({}, (error, response) => {
  
})