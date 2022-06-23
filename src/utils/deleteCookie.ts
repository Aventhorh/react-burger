import { setCookie } from "./setCookie";

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
} 