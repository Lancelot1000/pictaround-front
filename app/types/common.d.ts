type Category = { id: string, label: string, value: string };
type Categories = Category[];


interface List {
  limit: number | null;
  offset: number | null;
  total: number | null;
}