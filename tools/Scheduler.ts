import axios from 'axios';
import { TStorage, TDateTime } from '../types';
import storage from './Storage';
import Validator from './Validator';
import Message from './Message';
import Tool from './Tool';

/**
 * A class to manage scheduled tasks and send reminders based on date and time.
 */
class Scheduler {
  /**
   * Time zone used for scheduling tasks.
   */
  private static _timeZone: string = 'America/Santo_Domingo';

  /**
   * Singleton instance of the Scheduler class.
   */
  private static _instance: Scheduler = new Scheduler();

  /**
   * Private constructor to enforce Singleton pattern.
   */
  private constructor() {}

  /**
   * Returns the singleton instance of the Scheduler class.
   * @returns {Scheduler} The Scheduler instance.
   */
  public static getInstance(): Scheduler {
    return Scheduler._instance;
  }

  /**
   * Sets the time zone for scheduling tasks.
   * @param {string} timeZone - The time zone to set.
   * @returns {Scheduler} The Scheduler instance.
   * @throws Will throw an error if the time zone is empty.
   */
  public setTimeZone(timeZone: string): Scheduler {
    if (!timeZone) {
      throw new Error('Time zone cannot be empty.');
    }
    Scheduler._timeZone = timeZone;
    return this;
  }

  /**
   * Adds a schedule for a specific date, time, and email.
   * @param {string} date - The date for the schedule in MM/DD/YYYY format.
   * @param {string} schedule - The time for the schedule in HH:mm format.
   * @param {string} email - The email to notify.
   * @returns {string} Returns the status messages.
   */
  public async add(date: string, schedule: string, email: string): Promise<string> {
    if (!date || !schedule || !email) {
      return 'Missing required parameters: date, schedule, or email.';
    }

    if (!Validator.date(date)) {
      return Message.INVALID_DATE_FORMAT;
    }

    if (!Validator.oldDate(date, Scheduler._timeZone)) {
      return Message.DATE_IN_PAST;
    }

    if (!Validator.schedule(schedule)) {
      return Message.INVALID_SCHEDULE_FORMAT;
    }

    if (!Validator.oldSchedule(schedule, date, Scheduler._timeZone)) {
      return Message.SCHEDULE_IN_PAST;
    }

    if (!Validator.email(email)) {
      return Message.INVALID_EMAIL_FORMAT;
    }

    const currentStorage: TStorage = await storage.get();

    currentStorage[date] = currentStorage[date] || {};
    currentStorage[date][schedule] = currentStorage[date][schedule] || {};

    if (!currentStorage[date][schedule][email]) {
      currentStorage[date][schedule][email] = true;
      await storage.set(currentStorage);

      return Message.SCHEDULE_ADDED_SUCCESS;
    }

    return Message.SCHEDULE_ADDED_FAILURE;
  }

  /**
   * Observes the schedules and sends reminders if needed.
   * Deletes outdated schedules.
   * @private
   */
  public async observer(): Promise<void> {
    const { date, time }: TDateTime = Tool.getFormatDateTime(Tool.getCurrentDate(Scheduler._timeZone));
    const { date: lastDate }: TDateTime = Tool.subtractCurrentDay(Scheduler._timeZone, 1);
    const currentStorage: TStorage = await storage.get();

    if (
      (lastDate !== date) &&
      currentStorage[lastDate]
    ) {
      delete currentStorage[lastDate];

      await storage.set(currentStorage);
    }

    if (currentStorage[date]?.[time]) {
      const emails: string[] = Object.keys(currentStorage[date][time]);
      const { API_SEND_EMAIL_ENDPOINT = '' } = process.env;

      delete currentStorage[date][time];
      storage.set(currentStorage);

      try {
        await axios.post(API_SEND_EMAIL_ENDPOINT, { emails, schedule: `${date} ${time}` });
      } catch (error) {
        console.error('Failed to send the reminder.', error);
      }
    }

    storage.log();
  }
}

export default Scheduler.getInstance();
