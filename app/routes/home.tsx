// app/routes/home.tsx
// This is a basic example of a route module in a React Router app.
// It includes meta, action, loader, and component exports.
import { database } from "~/database/context";
import * as schema from "~/database/schema";

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

// Meta function to define the document head for this route
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Action function to handle form submissions or other mutations
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

// Loader function to fetch data needed for rendering this route
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

// Component function to render the UI for this route
export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <Welcome
      guestBook={loaderData.guestBook}
      guestBookError={actionData?.guestBookError}
      message={loaderData.message}
    />
  );
}
