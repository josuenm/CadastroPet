export interface PaginatedResponse<T> {
    page: number;
    pageSize: number;
    totalItems: number;
    items: T[];
}
