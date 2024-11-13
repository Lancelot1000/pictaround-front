export async function GET(request: Request) {
  return new Response(JSON.stringify([
    {
      id: Math.random().toString(),
      label: '전체',
      value: 'all',
    },
    {
      id: Math.random().toString(),
      label: '식사',
      value: 'food',
    },
    {
      id: Math.random().toString(),
      label: '베이커리',
      value: 'bakery',
    },
    {
      id: Math.random().toString(),
      label: '나들이',
      value: 'outing',
    },
    {
      id: Math.random().toString(),
      label: '체험',
      value: 'experience',
    },
    {
      id: Math.random().toString(),
      label: '전시',
      value: 'exhibition',
    },
    {
      id: Math.random().toString(),
      label: 'etc',
      value: '기타',
    },
  ]), {
    status: 200,
  });
}
