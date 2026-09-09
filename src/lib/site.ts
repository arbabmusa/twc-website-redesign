export const SITE_URL = "https://www.thewidercollective.com";
export const siteUrl = (path = "/") => new URL(path, SITE_URL).toString();
