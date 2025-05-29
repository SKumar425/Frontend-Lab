import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen p-5">
     <h1 className="text-lg italic font-medium">Welcome :</h1>
      <div className="w-full flex flex-col gap-1 mt-2">
        <Link href={`/nested-checkbox`} className="text-blue-600 underline">
          Nested Checkbox Problem
        </Link>
        <Link href={`/pagination`} className="text-blue-600 underline">
          Pagination
        </Link>
        <Link href={`/auto-complete`} className="text-blue-600 underline">
          Autocomplete Search Bar
        </Link>
      </div>
    </div>
  );
}
