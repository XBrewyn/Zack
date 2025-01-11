/**
 * A utility class that provides constants for common HTTP status codes.
 * These constants can be used to standardize HTTP responses in an application.
 */
class StatusCode {
  /**
   * HTTP 200 OK - The request was successfully completed.
   * This indicates that the server has successfully processed the request.
   */
  static readonly OK: 200 = 200;

  /**
   * HTTP 400 Bad Request - The server could not understand or process the request due to invalid syntax or client-side errors.
   * Common causes include missing parameters, invalid data, or malformed requests.
   */
  static readonly BAD_REQUEST: 400 = 400;

  /**
   * HTTP 500 Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request.
   * This is typically used when the server cannot handle the request due to a programming error or other unforeseen issues.
   */
  static readonly INTERNAL_SERVER_ERROR: 500 = 500;
}

export default StatusCode;
