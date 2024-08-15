import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to the dashboard
  redirect('/dashboard');
}

// import { Suspense } from 'react'
// import Image from 'next/image'

// export default function Home() {
//   return (
//     <main className='flex flex-col items-center justify-between p-24'>
//       <section>
//         <Suspense fallback={<p>Loading feed...</p>}>
//           {/* <PostFeed /> */}
//         </Suspense>
//         <Suspense fallback={<p>Loading weather...</p>}>
//           {/* <Weather /> */}
//         </Suspense>
//       </section>
//     </main>
//   );
// }

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

