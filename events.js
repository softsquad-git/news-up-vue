class Events {
  constructor(app, io){
    this.io = io;
    this.users = {};
  }

  socketEvents(io) {
    io.on('connection', (socket) => {
      socket.on('connected', (user) => {
        this.users[socket.id] = user;
        io.emit('users', this.users);
      });

      socket.on('disconnect', () => {
        delete this.users[socket.id];
        io.emit('users', this.users);
      });

      socket.on('message', (message) => {
        io.emit('message', message);
      });
    });
  }

  eventsConfig() {
    this.socketEvents(this.io);
  }
}

module.exports = Events;
