import { database } from "~/database/context";
import * as schema from "~/database/schema";

import type { Route } from "./+types/home";
import { Welcome } from "../pages/Welcome/welcome";

// Note: This file is just an example of how to use the database and form actions/loaders.
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// This action handles form submissions to add a new entry to the guest book.
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  if (typeof name !== "string" || typeof email !== "string") {
    return { guestBookError: "Name and email are required" };
  }

  name = name.trim();
  email = email.trim();
  if (!name || !email) {
    return { guestBookError: "Name and email are required" };
  }

  const db = database();
  try {
    await db.insert(schema.guestBook).values({ name, email });
  } catch (error) {
    return { guestBookError: "Error adding to guest book" };
  }
}

// This loader fetches the current entries in the guest book.
export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const guestBook = await db.query.guestBook.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return {
    guestBook,
    message: context.VALUE_FROM_EXPRESS,
  };
}

// This is the main component for the home route.
export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <Welcome
      guestBook={loaderData.guestBook}
      guestBookError={actionData?.guestBookError}
      message={loaderData.message}
    />
  );
}
