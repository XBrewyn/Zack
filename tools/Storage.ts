import axios from 'axios';
import { TStorage } from '../types';

/**
 * A class for managing in-memory storage and MongoDB persistence.
 */
class Storage {
  /**
   * In-memory cached data.
   */
  private static cache: TStorage | null = null;

  /**
   * Singleton instance of the Storage class.
   */
  private static instance: Storage = new Storage();

  /**
   * Private constructor to enforce Singleton pattern.
   */
  private constructor() { }

  /**
   * Returns the singleton instance of the Storage class.
   * @returns {Storage} The Storage instance.
   */
  public static getInstance(): Storage {
    return Storage.instance;
  }

  /**
   * Sets the data in the storage and persists it to MongoDB.
   * @param {TStorage} value - The data to store.
   */
  public async set(value: TStorage): Promise<void> {
    try {
      const { ENDPOINT_SCHEDULE = '' } = process.env;

      await axios.put(ENDPOINT_SCHEDULE, { data: value });
    } catch (error) {
      if ((error as Error).message === 'Request failed with status code 500') {
        Storage.cache = value;
        console.log('Updated schedule.');
      }
    }
  }

  /**
   * Retrieves data from the storage. Optionally bypasses the cache to fetch the latest data from the database.
   * @returns {Promise<TStorage>} The current stored data or an empty object if none exists.
   */
  public async get(): Promise<TStorage> {
    if (!Storage.cache) {
      try {
        const { ENDPOINT_SCHEDULE = '' } = process.env;
        const response = await axios.get(ENDPOINT_SCHEDULE);

        if (response) {
          const { data = null } = response.data;

          Storage.cache = data;
        }
      } catch (error) {
        console.error('Error getting data in storage:', (error as Error).message);
      }
    }

    return Storage.cache || ({} as TStorage);
  }

  /**
   * Logs the current stored data to the console.
   */
  public log(): void {
    console.log('Current storage cache:', Storage.cache);
  }
}

export default Storage.getInstance();
