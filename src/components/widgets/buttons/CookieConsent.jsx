import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const STORAGE_KEY = import.meta.env.PUBLIC_COOKIE_CONSENT_KEY || "cookie-consent";
const COOKIE_NAME = import.meta.env.PUBLIC_COOKIE_NAME || "cookie_consent";
const COOKIE_DAYS = Number(import.meta.env.PUBLIC_COOKIE_DAYS) || 30;
const COOKIE_MESSAGE = import.meta.env.PUBLIC_COOKIE_MESSAGE || "We use cookies to improve your experience and remember your preferences.";
const COOKIE_MAX_AGE = COOKIE_DAYS * 24 * 60 * 60;

/**
 * Safely read localStorage.
 */
const getStorage = (key) => {
    try {
        return window.localStorage.getItem(key);
    } catch (error) {
        console.warn("localStorage is unavailable:", error);
        return null;
    }
};

/**
 * Safely write localStorage.
 */
const setStorage = (key, value) => {
    try {
        window.localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.warn("localStorage is unavailable:", error);
        return false;
    }
};

/**
 * Safely set a cookie.
 */
const setCookie = (name, value) => {
    try {
        document.cookie =
            `${name}=${encodeURIComponent(value)}; ` +
            `path=/; ` +
            `max-age=${COOKIE_MAX_AGE}; ` +
            `SameSite=Lax`;

        return true;
    } catch (error) {
        console.warn("Cookies are unavailable:", error);
        return false;
    }
};

/**
 * Safely read a cookie.
 */
const getCookie = (name) => {
    try {
        const cookie = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));

        return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    } catch (error) {
        console.warn("Cookies are unavailable:", error);
        return null;
    }
};

/**
 * Save consent to both localStorage and cookie.
 */
const saveConsent = (value) => {
    setStorage(STORAGE_KEY, value);
    setCookie(COOKIE_NAME, value);
};

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const localConsent = getStorage(STORAGE_KEY);
        const cookieConsent = getCookie(COOKIE_NAME);

        if (!localConsent && !cookieConsent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        saveConsent("accepted");
        setVisible(false);

        toast.success("Cookie preferences saved!", { position: "bottom-center", duration: 3000, });
    };

    const declineCookies = () => {
        saveConsent("declined");
        setVisible(false);

        toast("Optional cookies have been disabled.", { icon: "🍪", position: "bottom-center", duration: 3000, });
    };

    return (
        <>
            <Toaster position="bottom-center" toastOptions={{ duration: 3000, style: { background: "#0f172a", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", }, }} />

            {visible && (
                <aside className="fixed inset-x-4 bottom-4 z-[9999] mx-auto w-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900/95 p-5 text-white shadow-2xl backdrop-blur-xl" role="dialog" aria-modal="false" aria-label="Cookie consent" aria-describedby="cookie-description">
                    <section className=" flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                        <header className="flex-1">
                            <h2 className="mb-2 text-base font-semibold">
                                🍪 Your privacy matters
                            </h2>

                            <p id="cookie-description" className="max-w-2xl text-sm leading-6 text-slate-300">
                                {COOKIE_MESSAGE}
                            </p>
                        </header>

                        <footer className="flex shrink-0 gap-3">
                            <button type="button" onClick={declineCookies} className="flex-1 rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900 sm:flex-none">
                                Decline
                            </button>

                            <button type="button" onClick={acceptCookies} className="flex-1 rounded-lg bg-green-400 px-5 py-2.5 text-sm font-semibold text-green-950 transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:flex-none"                            >
                                Accept
                            </button>
                        </footer>
                    </section>
                </aside>
            )}
        </>
    );
}