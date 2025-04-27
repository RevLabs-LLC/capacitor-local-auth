package io.revlabs.capacitor.localauth;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import androidx.fragment.app.FragmentActivity;
import java.util.Map;

/**
 * Capacitor plugin class for LocalAuth on Android.
 * 
 * This plugin provides a bridge between JavaScript/TypeScript code and
 * the native Android biometric authentication APIs. It allows apps to
 * use fingerprint, face recognition, and device credentials for authentication.
 */
@CapacitorPlugin(name = "LocalAuth")
public class LocalAuthPlugin extends Plugin {

    // Instance of the LocalAuth class that implements the actual authentication logic
    private LocalAuth implementation = new LocalAuth();

    /**
     * Checks the availability of authentication methods on the device.
     * 
     * This method is called from JavaScript via LocalAuth.checkAvailability().
     * It delegates to the LocalAuth implementation and returns a result
     * that matches the AvailabilityResult interface in TypeScript.
     * 
     * @param call Capacitor plugin call object containing callback methods
     */
    @PluginMethod
    public void checkAvailability(PluginCall call) {
        // Get the availability results from the implementation
        Map<String, Boolean> availabilityResult = implementation.checkAvailability(getContext());
        
        // Convert the Map to a JSObject that can be returned to JavaScript
        JSObject ret = new JSObject();
        for (Map.Entry<String, Boolean> entry : availabilityResult.entrySet()) {
            ret.put(entry.getKey(), entry.getValue());
        }
        call.resolve(ret);
    }
    
    /**
     * Authenticates the user using biometrics or device credentials.
     * 
     * This method is called from JavaScript via LocalAuth.authenticate().
     * It extracts options from the call, delegates to the LocalAuth implementation,
     * and returns a result that matches the expected interface in TypeScript.
     * 
     * @param call Capacitor plugin call object containing options and callback methods
     */
    @PluginMethod
    public void authenticate(PluginCall call) {
        // Extract options from the call, with default values if not provided
        String reason = call.getString("reason", "Authentication required");
        String title = call.getString("title", "Authentication");
        boolean confirmationRequired = call.getBoolean("confirmationRequired", false);
        
        // Get the current activity to show the authentication dialog
        FragmentActivity activity = getActivity();
        if (activity == null) {
            // Cannot authenticate without an activity
            call.reject("Unable to get activity");
            return;
        }
        
        // Delegate to the implementation class
        implementation.authenticate(activity, title, reason, confirmationRequired, (success, error) -> {
            // Create a response object to return to JavaScript
            JSObject ret = new JSObject();
            ret.put("success", success);
            if (error != null) {
                ret.put("error", error);
            }
            call.resolve(ret);
        });
    }
}
