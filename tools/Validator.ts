import Tool from './Tool';

/**
 * A utility class for validating dates, times, and email formats.
 */
class Validator {
  /**
   * Validates if a given string is in the correct date format (MM/DD/YYYY).
   * @param {string} value - The string to validate.
   * @returns {boolean} True if the string matches the date format, otherwise false.
   */
  static date(value: string): boolean {
    return /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value);
  }

  /**
   * Validates if a given date string is today or in the future.
   * @param {string} value - The date string to validate.
   * @returns {boolean} True if the date is today or in the future, otherwise false.
   */
  static oldDate(value: string, timeZone: string | undefined): boolean {
    const parsedDate: Date = new Date(value);
    const currentDate: Date = Tool.getCurrentDate(timeZone);

    return (
      (
        currentDate.getFullYear() === parsedDate.getFullYear() &&
        currentDate.getMonth() === parsedDate.getMonth() &&
        currentDate.getDate() === parsedDate.getDate()
      ) || currentDate.getTime() < parsedDate.getTime()
    );
  }

  /**
   * Checks if the given date and time (in the specified time zone) are in the future
   * compared to the current time.
   *
   * @param {string} value - The target time in the format "HH:mm".
   * @param {string} date - The target date in ISO string format (e.g., "YYYY-MM-DD").
   * @param {string | undefined} timeZone - The time zone for comparison (e.g., "America/New_York").
   * @returns {boolean} - Returns `true` if the target date and time are in the future; otherwise, `false`.
   */
  static oldSchedule(value: string, date: string, timeZone: string | undefined): boolean {
    const now: Date = Tool.getCurrentDate(timeZone);
    const customDate = new Date(date);
    const currentHours: number = now.getHours();
    const currentMinutes: number = now.getMinutes();
    const [targetHours, targetMinutes]: number[] = value.split(':').map(Number);

    return (
      (currentHours < targetHours) ||
      (currentHours === targetHours && currentMinutes < targetMinutes) ||
      customDate.getTime() > now.getTime()
    );
  }

  /**
   * Validates if a given string is in the correct time format (HH:mm).
   * @param {string} value - The string to validate.
   * @returns {boolean} True if the string matches the time format, otherwise false.
   */
  static schedule(value: string): boolean {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
  }

  /**
   * Validates if a given string is in the correct email format.
   * @param {string} value - The email string to validate.
   * @returns {boolean} True if the string matches the email format, otherwise false.
   */
  static email(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

export default Validator;
