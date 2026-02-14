import React, { useEffect } from 'react';

const NewWaba = () => {
    useEffect(() => {
        // 1. Initialize Facebook SDK
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '819027950096451', // Your App ID
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v24.0'
            });
        };

        // 2. Load SDK script if not already present
        if (!document.getElementById('facebook-jssdk')) {
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.src = "https://connect.facebook.net/en_US/sdk.js";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);
        }

        // 3. Listen for postMessage events from the Embedded Signup flow
        const handleFBMessage = (event) => {
            if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
                return;
            }

            try {
                const data = JSON.parse(event.data);
                if (data.type === 'WA_EMBEDDED_SIGNUP') {
                    if (data.event === 'FINISH') {
                        const { phone_number_id, waba_id } = data.data;
                        console.log("Phone number ID:", phone_number_id, "WABA ID:", waba_id);
                    } else if (data.event === 'CANCEL') {
                        const { current_step } = data.data;
                        console.warn("User cancelled at:", current_step);
                    } else if (data.event === 'ERROR') {
                        const { error_message } = data.data;
                        console.error("Signup error:", error_message);
                    }

                    const responseElement = document.getElementById("session-info-response");
                    if (responseElement) responseElement.textContent = JSON.stringify(data, null, 2);
                }
            } catch (e) {
                console.log('Non JSON Responses', event.data);
            }
        };

        window.addEventListener('message', handleFBMessage);

        return () => {
            window.removeEventListener('message', handleFBMessage);
        };
    }, []);

    const fbLoginCallback = (response) => {
        if (response.authResponse) {
            const code = response.authResponse.code;
            console.log("Authorization Code:", code);
        }
        const sdkResponseElement = document.getElementById("sdk-response");
        if (sdkResponseElement) sdkResponseElement.textContent = JSON.stringify(response, null, 2);
    };

    const launchWhatsAppSignup = () => {
        if (window.FB) {
            window.FB.login(fbLoginCallback, {
                config_id: '4382163352067488',
                response_type: 'code',
                override_default_response_type: true,
                extras: {
                    setup: {
                        "solutionID": "1544803499906564",
                    },
                    version: "v3",
                    featureType: "whatsapp_business_app_onboarding",
                    features: [
                        { name: "marketing_messages_lite" },
                        // { name: "app_only_install" },
                        // { name: "whatsapp_embedded_signup" }
                    ]
                }
            });
        } else {
            console.error("Facebook SDK not loaded yet.");
        }
    };

    return (
        <div className="p-5 font-sans">
            <h2 className="text-2xl font-semibold mb-4">WhatsApp Embedded Signup</h2>

            <button
                onClick={launchWhatsAppSignup}
                className="bg-[#1877f2] hover:bg-[#166fe5] border-0 rounded px-6 h-10 text-white font-semibold text-base cursor-pointer transition-colors"
            >
                Login with Facebook
            </button>

            <div className="mt-5">
                <div>
                    <p className="font-semibold">Session info response:</p>
                    <pre
                        id="session-info-response"
                        className="bg-gray-100 p-[10px] rounded min-h-[20px] overflow-x-auto"
                    ></pre>
                </div>

                <div className="mt-4">
                    <p className="font-semibold">SDK response:</p>
                    <pre
                        id="sdk-response"
                        className="bg-gray-100 p-[10px] rounded min-h-[20px] overflow-x-auto"
                    ></pre>
                </div>
            </div>
        </div>
    );
};

export default NewWaba;