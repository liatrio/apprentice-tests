export const APP_URL = process.env.APP_URL || "http://172.17.0.1:80/";

/**
 * Fetches the app root and parses the JSON body.
 * @returns {Promise<{ res: Response, text: string, body: any }>}
 */
export async function get() {
    const res = await fetch(APP_URL);
    const text = await res.text();
    return { res, text, body: JSON.parse(text) };
}
