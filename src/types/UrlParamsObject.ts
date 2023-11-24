export default interface UrlParamsObject {
    [queryParam: string]: string | string[] | undefined;
};