export async function GET() {

  return new Response(JSON.stringify(
    {
      "id": 3,
      "categoryId": 7,
      "name": "안산 포크너",
      "address": "안산 포크너 주소"
    }
  ), { status: 200});
}