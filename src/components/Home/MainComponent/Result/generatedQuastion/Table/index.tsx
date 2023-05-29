import useStore from "@/components/store/useStore";
import Link from "next/link";
import React from "react";

const Index = () => {
  const generatedForms = useStore((state) => state.generatedForms);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2   ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {generatedForms &&
            generatedForms.map((form) => (
              <tr
                key={form.link}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {form.title}
                </th>
                <td className="px-6 py-4"> {form.description}</td>

                <td className="px-6 py-4">
                  <Link href={form.link}>
                    <p className="text-purple-500 hover:font-bold">Link</p>
                  </Link>
                </td>
                <td className="px-6 py-4"> {form.createdAt.toString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
