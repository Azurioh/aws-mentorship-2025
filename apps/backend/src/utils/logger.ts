import fs from 'node:fs';
import { environment } from '@config/environment';
import chalk from 'chalk';
import stripColor from 'strip-ansi';
import Singleton from './singleton';

/**
 * @class Logger
 * @description A logger class that logs messages to a file and console
 * @extends Singleton
 * @example
 * const logger = Logger.getInstance();
 *
 * logger.info('This is an info message');
 * logger.error('This is an error message');
 * logger.warn('This is a warning message');
 * logger.debug('This is a debug message');
 * logger.setLogFile('logs/app.log');
 */
class Logger extends Singleton<Logger> {
  private logFile?: string;

  private getLogFile() {
    if (!this.logFile) {
      this.logFile = `logs/${environment.STAGE}-${new Date().toISOString().slice(0, 10)}.log`;
    }
    return this.logFile;
  }

  /**
   * @function log
   * @description Logs a message to the console and file
   * @param message - The message to log
   * @example
   * Logger.getInstance().log('This is a log message');
   */
  private log = (message: string): void => {
    const logMessage = `${chalk.grey(`[${new Date().toISOString().slice(0, 19).split('T').join(' ')}]`)} ${message}`;

    this.writeToFile(logMessage);
    console.log(logMessage);
  };

  /**
   * @function writeToFile
   * @description Writes a message to the log file
   * @param message - The message to write
   * @example
   * Logger.getInstance().writeToFile('This is a log message');
   */
  private writeToFile(message: string): void {
    if (environment && environment.STAGE === 'dev') {

      const messageWithoutColors = stripColor(message);
  
      fs.appendFileSync(this.getLogFile(), `${messageWithoutColors}\n`);
    }
  }

  /**
   * @function info
   * @description Logs an info message
   * @param message - The message to log
   * @example
   * Logger.getInstance().info('This is an info message');
   */
  info(message: unknown): void {
    const logMessage = `${chalk.green('INFO')} ${message}`;

    this.log(logMessage);
  }

  /**
   * @function error
   * @description Logs an error message
   * @param message - The message to log
   * @example
   * Logger.getInstance().error('This is an error message');
   */
  error(message: unknown): void {
    const logMessage = `${chalk.red('ERROR')} ${message}`;
    this.log(logMessage);
  }

  /**
   * @function warn
   * @description Logs a warning message
   * @param message - The message to log
   */
  warn(message: unknown): void {
    const logMessage = `${chalk.yellow('WARN')} ${message}`;
    this.log(logMessage);
  }

  /**
   * @function debug
   * @description Logs a debug message
   * @param message - The message to log
   */
  debug(message: unknown): void {
    const logMessage = `${chalk.blue('DEBUG')} ${message}`;
    this.log(logMessage);
  }

  /**
   * @function setLogFile
   * @description Sets the log file
   * @param logFile - The log file
   */
  setLogFile(logFile: string): void {
    this.logFile = logFile;
  }
}

export default Logger;
