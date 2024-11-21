export async function GET(request: Request) {
  return new Response(JSON.stringify([
    {
      "title": "스타벅스 한국프레스센터점",
      "address": "서울특별시 중구 세종대로 124 (태평로1가)",
      "latitude": 126.97805,
      "longitude": 37.56725
    },
    {
      "title": "스타벅스 무교로점",
      "address": "서울특별시 중구 무교로 15 (무교동)",
      "latitude": 126.97907,
      "longitude": 37.56722
    },
    {
      "title": "스타벅스 시청점",
      "address": "서울특별시 중구 을지로 19 삼성화재삼성빌딩 1층 (을지로1가)",
      "latitude": 126.97981,
      "longitude": 37.56629
    },
    {
      "title": "스타벅스 무교동점",
      "address": "서울특별시 중구 무교로 21 (무교동) 코오롱빌딩 1층",
      "latitude": 126.97898,
      "longitude": 37.56796
    },
    {
      "title": "스타벅스 환구단점",
      "address": "서울특별시 중구 소공로 112 (소공동)",
      "latitude": 126.979225,
      "longitude": 37.564598
    }
  ]), {
    status: 200,
  });
}
