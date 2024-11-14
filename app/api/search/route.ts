export async function GET(request: Request) {
  const getData = (i: number) => {
    return [
      {
        id: String(3 * i + 1),
        location: 'http://picsum.photos/200/300',
        lat: 37.3131550 + (i * 0.0006),
        lng: 126.8311518 + (i * 0.0006),
        name: 'NC 백화점',
      },
      {
        id: String(3 * i + 2),
        location: 'http://picsum.photos/200/300',
        lat: 37.3119431 + (i * 0.0006),
        lng: 126.8289038 + (i * 0.0006),
        name: '안산 홈플러스',
      },
      {
        id: String(3 * i + 3),
        location: 'http://picsum.photos/200/300',
        lat: 37.3111480 + (i * 0.0006),
        lng: 126.8306362 + (i * 0.0006),
        name: '안산 포크너',
      }];
  };

  return new Response(JSON.stringify(
    {
      limit: 20,
      offset: 0,
      total: 21,
      items: [
        ...getData(0),
        ...getData(1),
        ...getData(2),
        ...getData(3),
        ...getData(4),
        ...getData(5),
        ...getData(6),
      ],
    },
  ), {
    status: 200,
  });
}
