export async function GET(request: Request) {
  const getData = (count: number) => {
    return Array.from({ length: count }, () => {
      return {
        id: Math.random().toString(36),
        name: '맛있는 곳',
        "comment": "안산 포크너 코멘트1",
        "imageLocation": "http://picsum.photos/200/300",
        "createdDateTime": "2024-11-22T20:13:57.338271",
        "likeCount": 0
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