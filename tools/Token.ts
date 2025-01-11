import crypto from 'crypto';

class Token {
  /**
   * Method to validate a token
   * @param token - The token to validate
   * @returns true if the token is valid, otherwise false
   */
  public static async isValid(token: string): Promise<boolean> {
    try {
      const [encodedPayload, providedSignature]: string[] = token.split('.');
      const { SECRET_KEY = '' } = process.env;

      if (!encodedPayload || !providedSignature) {
        throw new Error('Invalid token format');
      }

      const expectedSignature: string = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(Buffer.from(encodedPayload, 'base64').toString('utf8'))
        .digest('hex');

      if (providedSignature !== expectedSignature) {
        throw new Error('Invalid signature');
      }

      /*
        const payload: any = JSON.parse(
          Buffer.from(encodedPayload, 'base64').toString('utf8')
        );
      */

    /*
      const existingDocument = // DATABASE;

      if (!existingDocument) {
        return true;
      }
    */

      return false;
    } catch (error) {
      return false;
    }
  }
}

export default Token;
