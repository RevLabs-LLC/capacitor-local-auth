/**
 * Interface for the Capacitor Local Auth plugin.
 * This plugin provides a thin wrapper around iOS LocalAuthentication
 * and Android Biometric APIs for authentication using biometrics or device credentials.
 */
export interface LocalAuthPlugin {
  /**
   * Checks what authentication methods are available on the device.
   * This checks for biometric authentication (Face ID, Touch ID, Fingerprint)
   * and device credentials (PIN, pattern, passcode) separately.
   *
   * @returns Promise resolving to an object containing availability information
   */
  checkAvailability(): Promise<AvailabilityResult>;

  /**
   * Prompts the user to authenticate using available biometrics
   * or device credentials.
   *
   * @param options Configuration options for the authentication prompt
   * @returns Promise resolving to an object with the authentication result
   */
  authenticate(options: AuthOptions): Promise<{ success: boolean; error?: string }>;
}

/**
 * Options for configuring the authentication prompt.
 */
export interface AuthOptions {
  /**
   * The reason for authentication to display to the user.
   * On iOS, this is required for the authentication dialog.
   * Default: "Authentication required"
   */
  reason?: string;

  /**
   * The title for the authentication dialog (Android only).
   * Default: "Authentication"
   */
  title?: string;

  /**
   * Whether to require explicit user confirmation after biometric
   * authentication (Android only).
   * Default: false
   */
  confirmationRequired?: boolean;
}

/**
 * Result of checking authentication availability on the device.
 */
export interface AvailabilityResult {
  /**
   * Whether biometric authentication (Face ID, Touch ID, Fingerprint)
   * is available on the device.
   */
  biometrics: boolean;

  /**
   * Whether device credentials (PIN, pattern, passcode) are available.
   */
  deviceCredentials: boolean;

  /**
   * Whether any authentication method is available (either biometrics or device credentials).
   */
  available: boolean;
}
