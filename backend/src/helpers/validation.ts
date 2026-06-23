export function isValidId(id: string) {
    return /^\d+$/.test(id);
}

export function isValidContent(content: string) {
    return content.trim().length > 0;
}