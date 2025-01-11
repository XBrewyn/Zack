import { TDateTime } from '../types';

/**
 * A utility class providing tools for date and time manipulation and formatting.
 */
class Tool {
  /**
   * Gets the current date and time adjusted to the specified time zone.
   * @param {string | undefined} timeZone - The IANA time zone string (e.g., 'America/New_York'). If undefined, the system's default time zone is used.
   * @returns {Date} - A Date object representing the current date and time in the specified time zone.
   */
  static getCurrentDate(timeZone: string | undefined): Date {
    return new Date(
      new Date().toLocaleString('en-US', { timeZone })
    );
  }

  /**
   * Pads a number with a leading zero if it is less than 10, ensuring a two-digit string format.
   * @param {number} number - The number to format.
   * @returns {string} - A string representation of the number, padded with a leading zero if necessary.
   */
  static setZero(number: number): string {
    return String(number).padStart(2, '0');
  }

  /**
   * Subtracts a specified number of days from the current date in the given time zone.
   * @param {string} timeZone - The IANA time zone string (e.g., 'America/New_York').
   * @param {number} day - The number of days to subtract.
   * @returns {TDateTime} - An object containing the formatted date and time after subtraction.
   */
  static subtractCurrentDay(timeZone: string, day: number): TDateTime {
    const date: Date = Tool.getCurrentDate(timeZone);
    date.setDate(date.getDate() - day);
    return Tool.getFormatDateTime(date);
  }

  /**
   * Formats a given Date object into a human-readable date and time format.
   * @param {Date} localDate - The Date object to format.
   * @returns {TDateTime} - An object containing the formatted date and time as strings.
   */
  static getFormatDateTime(localDate: Date): TDateTime {
    const year: number = localDate.getFullYear();
    const month: string = Tool.setZero(localDate.getMonth() + 1);
    const day: string = Tool.setZero(localDate.getDate());
    const hours: string = Tool.setZero(localDate.getHours());
    const minutes: string = Tool.setZero(localDate.getMinutes());

    return {
      date: `${month}/${day}/${year}`,
      time: `${hours}:${minutes}`,
    };
  }
}

export default Tool;
