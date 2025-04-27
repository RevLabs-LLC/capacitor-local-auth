import { WebPlugin } from '@capacitor/core';

import type { AuthOptions, AvailabilityResult, LocalAuthPlugin } from './definitions';

/**
 * Web implementation of the LocalAuth plugin.
 *
 * Note: Biometric authentication is not available in web browsers.
 * This implementation provides fallback responses that indicate
 * authentication methods are not available.
 */
export class LocalAuthWeb extends WebPlugin implements LocalAuthPlugin {
  /**
   * Checks availability of authentication methods on web.
   * Always returns false for all values since biometric
   * authentication is not available in web browsers.
   *
   * @returns An object indicating that no authentication methods are available
   */
  async checkAvailability(): Promise<AvailabilityResult> {
    // Web doesn't support biometric authentication
    return {
      biometrics: false,
      deviceCredentials: false,
      available: false,
    };
  }

  /**
   * Attempts to authenticate on web.
   * Always throws an error since biometric authentication
   * is not available in web browsers.
   *
   * @param _options Authentication options (not used)
   * @throws Error indicating that authentication is not available
   */
  async authenticate(_options: AuthOptions): Promise<{ success: boolean; error?: string }> {
    throw this.unavailable('Local authentication is not available in web browsers');
  }
}
