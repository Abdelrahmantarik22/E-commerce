"use server";

import { getTokenAuth } from "@/utilites/getTokenAuth";

export async function updateQuan({productId,count}:{productId:string,count:number}) {
  const token = await getTokenAuth();

  if (!token) {
    throw new Error("logIn first");
  }

  const res = await fetch(`${process.env.API}/cart/${productId}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ count }),
  });

  const payload = await res.json();

  return payload;
}

