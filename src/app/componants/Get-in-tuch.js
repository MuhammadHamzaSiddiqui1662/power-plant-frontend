"use client"; // This is a client component 👈🏽
import Link from "next/link";
export default function GetInTuch() {
  return (
    <div className="container lg:mt-24 mt-16">
      <div className="grid grid-cols-1 text-center">
        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-black dark:text-white">
          Have Question ? Get in touch!
        </h3>

        <p className="text-slate-400 max-w-xl mx-auto">
          A great plateform to buy, sell and rent your properties without any
          agent or commisions.
        </p>

        <div className="mt-6">
          <Link
            href="/contact"
            className="btn bg-customGreen hover:bg-green-700 text-white rounded-md"
          >
            <i className="uil uil-phone align-middle me-2"></i> Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
