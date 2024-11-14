type Category = { id: string, label: string, value: string };
type Categories = Category[];


interface List {
  limit: number;
  offset: number;
  total: number;
}