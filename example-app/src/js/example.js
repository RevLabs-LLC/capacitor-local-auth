/**
 * Example application for the Capacitor Local Auth plugin.
 * This demonstrates how to use the plugin to check availability
 * and perform authentication using biometrics or device credentials.
 */
import { LocalAuth } from 'capacitor-local-auth';

// Wait for the DOM to be fully loaded before setting up event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Setup event listeners for the UI buttons
  document.getElementById('checkAvailability').addEventListener('click', checkAvailability);
  document.getElementById('authenticate').addEventListener('click', authenticate);
});

/**
 * Checks what authentication methods are available on the device.
 * 
 * This demonstrates how to use the checkAvailability() method to determine
 * if the device supports biometric authentication or device credentials.
 * The results are displayed in the UI.
 */
async function checkAvailability() {
  const resultContainer = document.getElementById('resultContainer');
  
  try {
    // Call the plugin's checkAvailability method
    const result = await LocalAuth.checkAvailability();
    
    // Display the detailed results in the UI
    resultContainer.innerHTML = `
      <p>Authentication Available: ${result.available}</p>
      <p>Biometrics Available: ${result.biometrics}</p>
      <p>Device Credentials Available: ${result.deviceCredentials}</p>
    `;
  } catch (error) {
    // Handle any errors that might occur
    resultContainer.innerHTML = `Error checking availability: ${error.message}`;
  }
}

/**
 * Attempts to authenticate the user using biometrics or device credentials.
 * 
 * This demonstrates how to use the authenticate() method to prompt the user
 * for authentication. The result of the authentication attempt is displayed
 * in the UI.
 */
async function authenticate() {
  const resultContainer = document.getElementById('resultContainer');
  // Get the reason for authentication from the input field
  const reason = document.getElementById('authReason').value;
  
  try {
    // Call the plugin's authenticate method with options
    const result = await LocalAuth.authenticate({ 
      reason: reason,         // The reason shown to the user
      title: 'Authentication Required',  // Title for the dialog (Android)
      confirmationRequired: false        // Whether to require confirmation (Android)
    });
    
    // Check the authentication result
    if (result.success) {
      // Authentication succeeded
      resultContainer.innerHTML = 'Authentication Successful!';
    } else {
      // Authentication failed or was canceled
      resultContainer.innerHTML = `Authentication Failed: ${result.error || 'Unknown reason'}`;
    }
  } catch (error) {
    // Handle any errors that might occur
    resultContainer.innerHTML = `Error during authentication: ${error.message}`;
  }
}
