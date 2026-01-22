export class QueryFilterModel {
  textSearch: string | undefined;
  pageSize!: number;
  pageNumber!: number;
  showAdSearch!: boolean;
  status?: boolean;
  [key: string]: any;
}
