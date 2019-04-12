export module UrlUtils {

    export function getProtocol(): string {
        return location.protocol;
    }

    export function getHostname(): string {
        return location.hostname;
    }

    export function getPort(): number {
        return Number(location.port);
    }

    export function getHost(): string {
        return location.host;
    }

    export function getCurrentUrl(): string {
        return `${location.protocol}//${location.host}${location.pathname}`;
    }

    export function currentUrlMatchesRegex(pattern: string): boolean {
        const regex = new RegExp(pattern, 'g');
        return regex.test(getCurrentUrl());
    }

    export function urlEndsWith(pattern: string): boolean {
        const regex = new RegExp(`^.*${pattern}$`);
        return regex.test(getCurrentUrl());
    }

    export function getLastUrlSegment(): string {
        const url = getCurrentUrl();
        return url.substr(url.lastIndexOf('/') + 1);
    }

}
