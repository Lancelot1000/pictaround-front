export async function GET(request: Request) {
  const getData = (count: number) => {
    return Array.from({ length: count }, () => {
      return {
        id: Math.random().toString(36),
        name: '맛있는 곳',
        comment: 'comment',
        location: 'http://picsum.photos/200/300',
      };

    });
  };

  return new Response(JSON.stringify(
    {
      limit: null,
      offset: null,
      total: null,
      items: getData(20),
    }
  ), { status: 200});
}