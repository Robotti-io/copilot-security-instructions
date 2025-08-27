import Transport from 'winston-transport';
import amqp from 'amqplib';

class AMQPTransport extends Transport {
  #options;
  
  constructor(options) {
    super({
      format: 'json',
      level: options.level,
    });
    this.#options = options;
    this.initiated = false;
  }

  async #connect() {
    this.connection = await amqp.connect({
      protocol: this.#options.protocol,
      hostname: this.#options.hostname,
      port: this.#options.port,
      username: this.#options.username,
      password: this.#options.password,
      vhost: this.#options.vhost,
      heartbeat: this.#options.heartbeat,
      locale: this.#options.locale,
    });
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.#options.exchange, this.#options.type, {
      durable: this.#options.durable,
    });
    this.connection.on('close', this.#connect.bind(this));
  }

  log(info, callback) {
    const message = JSON.parse(JSON.stringify(info));
    message.app = this.#options.app;
    process.nextTick(async () => {
      if (!this.initiated) {
        await this.#connect();
        this.initiated = true;
      }
      this.channel.publish(
        this.#options.exchange,
        message.level,
        Buffer.from(JSON.stringify(message)),
      );
      if (callback) {
        return callback(null, true);
      }
      return true;
    });
  }
}

export default AMQPTransport;
