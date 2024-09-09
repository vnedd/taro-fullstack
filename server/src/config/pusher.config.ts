import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1862281',
  key: 'cd6381255f3866143184',
  secret: '9c75ea234a8cb9f08b26',
  cluster: 'ap2',
  useTLS: true
});

export default pusher;
