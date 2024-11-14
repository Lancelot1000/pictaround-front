export async function GET(request: Request) {
  console.log(request);

  return new Response(JSON.stringify(
    {
      limit: 20,
      offset: 0,
      total: 2,
      items: [
        {
          id: '1',
          location: 'http://picsum.photos/200/300',
          lat: 37.3131550,
          lng: 126.8311518,
          name: 'NC 백화점',
        },
        {
          id: '2',
          location: 'http://picsum.photos/200/300',
          lat: 37.3119431,
          lng: 126.8289038,
          name: '안산 홈플러스',
        },
      ],
    },
  ), {
    status: 200,
  });
}
