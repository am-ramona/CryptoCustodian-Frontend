import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Your logic here (e.g., fetching data)
  // const data = { message: 'Hello, world!' }; // Example response data

  // return NextResponse.json(data); // Return a valid response

  const param = request.url; // Example of using some request data

  if (param === 'expectedValue') {
    return NextResponse.json({ message: 'Expected response' });
  } else {
    return NextResponse.json({ message: 'Default response' });
  }
}

export async function POST(request: Request) {
  // Your logic for POST request
  const body = await request.json();

  // Process the body as needed

  return NextResponse.json({ received: body });
}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
