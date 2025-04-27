import Foundation
import Capacitor

/**
 * Capacitor plugin class for LocalAuth.
 * 
 * This class provides the bridge between JavaScript/TypeScript code
 * and native iOS authentication functionality.
 * 
 * It implements the Capacitor plugin protocol and exposes methods
 * that can be called from JavaScript.
 */
@objc(LocalAuthPlugin)
public class LocalAuthPlugin: CAPPlugin, CAPBridgedPlugin {
    /// The unique identifier for this plugin
    public let identifier = "LocalAuthPlugin"
    
    /// The JS name for this plugin, used when importing in JS/TS
    public let jsName = "LocalAuth"
    
    /// The list of methods exposed by this plugin to JavaScript
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "checkAvailability", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "authenticate", returnType: CAPPluginReturnPromise)
    ]
    
    /// Instance of the LocalAuth class that implements the actual authentication logic
    private let implementation = LocalAuth()

    /**
     * Checks the availability of authentication methods on the device.
     * 
     * This method is called from JavaScript via `LocalAuth.checkAvailability()`.
     * It delegates to the LocalAuth implementation and returns a result
     * that matches the AvailabilityResult interface in TypeScript.
     * 
     * @param call Capacitor plugin call object containing arguments and callback methods
     */
    @objc func checkAvailability(_ call: CAPPluginCall) {
        let availabilityResult = implementation.checkAvailability()
        call.resolve(availabilityResult)
    }
    
    /**
     * Authenticates the user using biometrics or device credentials.
     * 
     * This method is called from JavaScript via `LocalAuth.authenticate()`.
     * It extracts options from the call, delegates to the LocalAuth implementation,
     * and returns a result that matches the expected interface in TypeScript.
     * 
     * @param call Capacitor plugin call object containing arguments and callback methods
     */
    @objc func authenticate(_ call: CAPPluginCall) {
        // Extract the reason string from the call, or use a default value
        let reason = call.getString("reason") ?? "Authentication required"
        
        // Delegate to the implementation class
        implementation.authenticate(reason: reason) { success, errorMessage in
            if success {
                // Authentication succeeded
                call.resolve([
                    "success": true
                ])
            } else {
                // Authentication failed or was canceled
                call.resolve([
                    "success": false,
                    "error": errorMessage ?? "Authentication failed"
                ])
            }
        }
    }
}
