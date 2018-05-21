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
