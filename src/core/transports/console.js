import { transports, addColors, format } from 'winston';

class ConsoleTransport extends transports.Console {
  constructor(options, colors) {
    addColors(colors);
    const consoleOptions = options;
    delete consoleOptions.enabled;
    super(consoleOptions);
    this.format = format.combine(
      format.colorize({
        colors,
        level: true,
      }),
      format.simple(),
    );
  }
};

export default ConsoleTransport;
