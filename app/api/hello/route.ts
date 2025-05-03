export async function GET(request: Request) {
  return Response.json({
    message: "Hello Sayantan",
    timestamp: Date?.now(),
  });
}
