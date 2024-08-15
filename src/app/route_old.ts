// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   // Your logic here (e.g., fetching data)
//   // const data = { message: 'Hello, world!' }; // Example response data

//   // return NextResponse.json(data); // Return a valid response

//   const param = request.url; // Example of using some request data

//   if (param === 'expectedValue') {
//     return NextResponse.json({ message: 'Expected response' });
//   } else {
//     return NextResponse.json({ message: 'Default response' });
//   }
// }

// export async function POST(request: Request) {
//   // Your logic for POST request
//   const body = await request.json();

//   // Process the body as needed

//   return NextResponse.json({ received: body });
// }

// export async function HEAD(request: Request) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}


// import { useEffect, useState } from 'react';

// interface PortfolioItem {
//   token: string;
//   amount: string;
//   date: Date;
// }

// export default function PortfolioPage() {
//   const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPortfolio() {
//       try {
//         const response = await fetch('/api/portfolio');
//         const data = await response.json();
//         setPortfolio(data.portfolio);
//       } catch (error) {
//         console.error('Error fetching portfolio data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPortfolio();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold">Client Portfolio</h1>
//       <ul>
//         {portfolio.map((item, index) => (
//           <li key={index} className="border-b py-2">
//             <div className="font-semibold">{item.token}</div>
//             <div>Amount: {item.amount}</div>
//             <div>Date: {item.date.toDateString()}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import type { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const data = {
    message: "Hello from Next.js API!",
  };

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Process the incoming data and return a response
  const responseMessage = `Received data: ${JSON.stringify(body)}`;

  return NextResponse.json({ message: responseMessage });
}
