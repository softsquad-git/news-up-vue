import VueSocketIO from "vue-socket.io";
import socketio from 'socket.io-client';

export default async ({Vue}) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: socketio(':6999')
  }))
}
