"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Uuser from "../assets/default-profile.png";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Cart } from "@/interfaces/cart.interface";
import { useTheme } from "../context/Theme";

export default function Nav() {
  const { Dark, setDark } = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setDark(theme);
if (theme==='dark') {
  document.documentElement.classList.add('dark')
}else{
  document.documentElement.classList.remove('dark')

}


  });

  const { data: cartProducts } = useQuery<Cart>({
    queryFn: async () => {
      const res = await fetch("/api/cart");
      const payload = await res.json();
      return payload;
    },
    queryKey: ["cart"],
  });

  const { data: session } = useSession(); //دي البيانات اللي راجع من السيشن ستوريدج
  const [open, setOPen] = useState(false);

  const links = [
    { path: session ? "/cart" : "/login", element: "Cart" },
    { path: "/wishlist", element: "Wishlist" },
    { path: "/product", element: "Products" },
  ];
  const autho = [
    { path: "/login", element: "Log In" },
    { path: "/register", element: "Register" },
    { element: "Log out" },
  ];

  function signout() {
    signOut({
      callbackUrl: "/",
    });
  }

  return (
    <>
      <nav className="bg-gray-100   dark:bg-gray-900 p-3 sticky top-0 left-0 w-full z-10  shadow-lg shadow-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-4 p-1">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="text-gray-950 dark:text-white font-mainn text-2xl font-bold">
              <i className="fa-solid fa-cart-shopping text-main"></i> Fresh Cart{" "}
            </h1>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-5">
            <div className={` w-full  md:w-auto`}>
              <ul className="font-bold  flex flex-col p-3 md:p-0  border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {session ? (
                  <li
                    onClick={signout}
                    className="cursor-pointer hidden md:block py-2 px-3 text-gray-950 rounded-sm md:bg-main  dark:text-white"
                  >
                    {autho[2].element}
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href={`${autho[0].path}`}
                        className="md:block hidden py-2 px-3 text-gray-950 rounded-sm   md:bg-main dark:text-white"
                        aria-current="page"
                      >
                        {autho[0].element}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${autho[1].path}`}
                        className="md:block hidden py-2 px-3 text-gray-950 rounded-sm   md:bg-main dark:text-white"
                        aria-current="page"
                      >
                        {autho[1].element}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button
              onClick={() => setOPen(!open)}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <i
              onClick={() => {
                const newTheme = Dark === "light" ? "dark" : "light";
                setDark(newTheme);
                localStorage.setItem("theme", newTheme);
              }}
              className={`${
                Dark === "light"
                ? "fa-solid fa-moon text-dark"
                  : "fa-solid fa-sun text-white"
              } cursor-pointer`}
            ></i>
          </div>
          <div
            className={`items-center justify-between ${
              open ? "" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-cta"
          >
            <ul className="font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {session && (
                <li>
                  <Link
                    href={"/profile"}
                    className="flex md:flex-row flex-col gap-3"
                  >
                    <Image
                      className="rounded-full size-8"
                      src={session.user?.image ? session.user?.image : Uuser}
                      width={50}
                      height={50}
                      alt={`${session.user?.name}`}
                    ></Image>
                    <p className="text-main font-bold">{session.user?.name}</p>
                  </Link>
                </li>
              )}

              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={`block py-2 px-3 text-gray-950 rounded-sm md:bg-transparent  md:p-0 dark:text-white relative ${
                      link.element === "Cart" &&
                      session &&
                      cartProducts?.numOfCartItems != 0 &&
                      "flex gap-2 flex-row items-center"
                    }`}
                    aria-current="page"
                  >
                    {link.element === "Cart" &&
                      session &&
                      cartProducts?.numOfCartItems != 0 && (
                        <span className="size-5 rounded-full text-white text-sm bg-main  flex justify-center items-center order-2 ">
                          {cartProducts?.numOfCartItems}
                        </span>
                      )}{" "}
                    {link.element}
                  </Link>
                </li>
              ))}
              {!session ? (
                <>
                  <li>
                    <Link
                      href={`${autho[0].path}`}
                      className="block md:hidden py-2 px-3 text-gray-950 rounded-sm md:bg-transparent  md:p-0 dark:text-white"
                      aria-current="page"
                    >
                      {autho[0].element}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${autho[1].path}`}
                      className="block md:hidden py-2 px-3 text-gray-950 rounded-sm md:bg-transparent  md:p-0 dark:text-white"
                      aria-current="page"
                    >
                      {autho[1].element}
                    </Link>
                  </li>
                </>
              ) : (
                <li
                  onClick={signout}
                  className="cursor-pointer md:hidden block py-2 px-3  text-gray-950 rounded-sm md:bg-transparent  md:p-0 dark:text-white"
                >
                  {autho[2].element}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
