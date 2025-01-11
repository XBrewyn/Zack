/**
 * A utility class that defines common validation messages as constants.
 */
class Message {
  /**
   * Error message for an invalid date format.
   * Expected format: MM/DD/YYYY.
   */
  static readonly INVALID_DATE_FORMAT: string = 'Invalid date format (MM/DD/YYYY expected).';

  /**
   * Error message when the provided date is in the past.
   */
  static readonly DATE_IN_PAST: string = 'The date is in the past.';

  /**
   * Error message for an invalid schedule format.
   */
  static readonly INVALID_SCHEDULE_FORMAT: string = 'Invalid schedule format.';

  /**
   * Error message when the schedule is invalid because it is in the past.
   */
  static readonly SCHEDULE_IN_PAST: string = 'The schedule is in the past.';

  /**
   * Error message for an invalid email format.
   */
  static readonly INVALID_EMAIL_FORMAT: string = 'Invalid email format.';

  /**
   * Success message for successfully adding a schedule.
  */
  static readonly SCHEDULE_ADDED_SUCCESS: string = 'Schedule added successfully.';

  /**
   * Error message when adding a schedule fails.
   */
  static readonly SCHEDULE_ADDED_FAILURE: string = 'Failed to add schedule.';
}

export default Message;
