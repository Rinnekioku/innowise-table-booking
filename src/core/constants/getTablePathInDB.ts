export const getTablePathInDB = (path: string, id: string): string => {
    const removeTag = 2;
    const dividerInURL = '/';
    const cleanDoubleSlash = /[/][/]/;
    const tableReservationPath = `reservation${dividerInURL}${path
        .split(dividerInURL)
        .filter((_, index) => index % removeTag === 0)
        .join(dividerInURL)}${dividerInURL}${id}`
        .replace(cleanDoubleSlash, '/');
    return tableReservationPath;
};
