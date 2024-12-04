"use client";

import { FC, Fragment, ReactNode, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  renderTrigger?: () => ReactNode;
}
export default function Search({ open, moduleData, setOpen, catgories }) {
  const [rawQuery, setRawQuery] = useState("a");

  const router = useRouter();

  const query = rawQuery.toLowerCase().replace(/^[#>]/, "");

  const filteredModules =
    rawQuery === "<"
      ? moduleData
      : query === "" || rawQuery.startsWith("<")
      ? []
      : moduleData.filter((module) =>
          module.name.toLowerCase().includes(query)
        );

  const filteredCategories =
    rawQuery === ">"
      ? catgories
      : query === "" || rawQuery.startsWith(">")
      ? []
      : catgories.filter((category) =>
          category.label.toLowerCase().includes(query)
        );
  return (
    <>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setRawQuery("a")}
        appear
      >
        <Dialog
          as="div"
          className="relative z-[99]"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100"
            >
              <Dialog.Panel
                className="block mx-auto max-w-2xl transform divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-xl dark:bg-gray-900 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                as="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push("/search");
                  setOpen(false);
                }}
              >
                <Combobox
                  onChange={(item: any) => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  name="searchpallet"
                >
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setRawQuery(event.target.value)}
                    />
                  </div>

                  {(moduleData.length > 0 || catgories.length > 0) &&
                    query === "" && (
                      <Combobox.Options
                        static
                        className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                      >
                        {moduleData.length > 0 && (
                          <li>
                            <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              Modules
                            </h2>
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {moduleData.map((module: any) => (
                                <Link
                                  href={`/modules/${module?.id}`}
                                  key={module.id}
                                  onClick={() => setOpen(false)}
                                  className={
                                    "flex select-none items-center px-4 py-2 text-black hover:bg-indigo-600 hover:text-white"
                                  }
                                >
                                  <MagnifyingGlassIcon className="w-5 dark:text-white" />

                                  <span className="ms-3 flex-auto dark:text-white truncate">
                                    {module.name}
                                  </span>
                                </Link>
                              ))}
                            </ul>
                          </li>
                        )}

                        {catgories.length > 0 && (
                          <li>
                            <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              Categories
                            </h2>
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {catgories.map((category: any) => (
                                <Link
                                  key={module.id}
                                  href={`/modules?category=${category.label}`}
                                  onClick={() => setOpen(false)}
                                  className={
                                    "flex select-none items-center px-4 py-2 text-black hover:bg-indigo-600 hover:text-white"
                                  }
                                >
                                  <MagnifyingGlassIcon className="w-5 dark:text-white" />

                                  <span className="ms-3 flex-auto dark:text-white truncate">
                                    {category.label}
                                  </span>
                                </Link>
                              ))}
                            </ul>
                          </li>
                        )}
                      </Combobox.Options>
                    )}
                  {(filteredModules.length > 0 ||
                    filteredCategories.length > 0) &&
                    query !== "" && (
                      <Combobox.Options
                        static
                        className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                      >
                        {filteredModules.length > 0 && (
                          <li>
                            <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              Modules
                            </h2>
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {filteredModules.map((module: any) => (
                                <Link
                                  href={`/modules/${module?.id}`}
                                  key={module.id}
                                  onClick={() => setOpen(false)}
                                  className={
                                    "flex select-none items-center px-4 py-2 text-black hover:bg-indigo-600 hover:text-white"
                                  }
                                >
                                  <MagnifyingGlassIcon className="w-5 dark:text-white" />
                                  <span className="ms-3 flex-auto dark:text-white truncate">
                                    {module.name}
                                  </span>
                                </Link>
                              ))}
                            </ul>
                          </li>
                        )}

                        {filteredCategories.length > 0 && (
                          <li>
                            <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              Categories
                            </h2>
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {filteredCategories.map((category: any) => (
                                <Link
                                  key={module.id}
                                  href={`/modules?category=${category.label}`}
                                  onClick={() => setOpen(false)}
                                  className={
                                    "flex select-none items-center px-4 py-2 text-black hover:bg-indigo-600 hover:text-white"
                                  }
                                >
                                  <MagnifyingGlassIcon className="w-5  dark:text-white" />

                                  <span className="ms-3 flex-auto dark:text-white truncate">
                                    {category.label}
                                  </span>
                                </Link>
                              ))}
                            </ul>
                          </li>
                        )}
                      </Combobox.Options>
                    )}

                  {rawQuery === "?" && (
                    <div className="py-14 px-6 text-center text-sm sm:px-14">
                      <LifebuoyIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                        Help with searching
                      </p>
                      <p className="mt-2 text-gray-500">
                        Use this tool to quickly search for users and projects
                        across our entire platform. You can also use the search
                        modifiers found in the footer below to limit the results
                        to just users or projects.
                      </p>
                    </div>
                  )}

                  {query !== "" &&
                    rawQuery !== "?" &&
                    filteredCategories.length === 0 &&
                    filteredModules.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <ExclamationTriangleIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                          No results found
                        </p>
                        <p className="mt-2 dark:text-gray-300 text-gray-500">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}

                  <div className="flex flex-wrap items-center dark:bg-gray-900 dark:text-white bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    Type{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border dark:bg-gray-900 dark:text-white bg-white font-semibold sm:mx-2",
                        rawQuery === "?"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      ?
                    </kbd>{" "}
                    for help
                  </div>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
