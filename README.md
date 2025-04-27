# capacitor-local-auth

A thin wrapper around native iOS LocalAuthentication and Android Biometric APIs for Capacitor

## Install

```bash
npm install capacitor-local-auth
npx cap sync
```

## iOS Setup

Add the NSFaceIDUsageDescription to your Info.plist:

```xml
<key>NSFaceIDUsageDescription</key>
<string>We use Face ID/Touch ID to secure your account access</string>
```

## Android Setup

No additional setup required. The plugin adds the necessary permissions to the AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

## API

<docgen-index>

- [`checkAvailability()`](#checkavailability)
- [`authenticate(...)`](#authenticate)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkAvailability()

```typescript
checkAvailability() => Promise<AvailabilityResult>
```

Check if biometric authentication or device credentials are available on the device.

**Returns:** <code>Promise&lt;AvailabilityResult&gt;</code>

---

### authenticate(...)

```typescript
authenticate(options?: AuthOptions) => Promise<{ success: boolean; error?: string; }>
```

Perform biometric authentication.

| Param         | Type                                                                              | Description                            |
| ------------- | --------------------------------------------------------------------------------- | -------------------------------------- |
| **`options`** | <code>{ reason?: string; title?: string; confirmationRequired?: boolean; }</code> | Options for the authentication prompt. |

**Returns:** <code>Promise&lt;{ success: boolean; error?: string; }&gt;</code>

---

### Interfaces

#### AvailabilityResult

| Prop                    | Type                 | Description                                                          |
| ----------------------- | -------------------- | -------------------------------------------------------------------- |
| **`biometrics`**        | <code>boolean</code> | Whether biometric authentication (fingerprint, face ID) is available |
| **`deviceCredentials`** | <code>boolean</code> | Whether device credentials (PIN, pattern, passcode) are available    |
| **`available`**         | <code>boolean</code> | Whether any authentication method is available                       |

#### AuthOptions

| Prop                       | Type                 | Description                                                                                                 |
| -------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`reason`**               | <code>string</code>  | The reason for the authentication that is displayed to the user. Default: "Authentication required"         |
| **`title`**                | <code>string</code>  | The title for the authentication dialog (Android only). Default: "Authentication"                           |
| **`confirmationRequired`** | <code>boolean</code> | Whether to require explicit user confirmation after biometric authentication (Android only). Default: false |

</docgen-api>

## Example

```typescript
import { LocalAuth } from 'capacitor-local-auth';

// Check what authentication methods are available
const checkAvailability = async () => {
  const result = await LocalAuth.checkAvailability();
  console.log('Any auth method available:', result.available);
  console.log('Biometrics available:', result.biometrics);
  console.log('Device credentials available:', result.deviceCredentials);
};

// Authenticate the user
const authenticate = async () => {
  try {
    const result = await LocalAuth.authenticate({
      reason: 'Please authenticate to continue',
      title: 'Authentication Required',
      confirmationRequired: false,
    });

    if (result.success) {
      console.log('Authentication successful!');
      // Proceed with protected action
    } else {
      console.log('Authentication failed:', result.error);
    }
  } catch (error) {
    console.error('Error during authentication:', error);
  }
};
```
