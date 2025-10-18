// This is a simple welcome page with a guest book feature.
// It demonstrates how to use React Router's Form, action, and loader features.
// You can sign the guest book with your name and email, and see a list of previous signers.
import { Form, useNavigation } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Button } from "@/app/components/ui/button";

export function Welcome({
  guestBook,
  guestBookError,
  message,
}: {
  guestBook: {
    name: string;
    id: number;
  }[];
  guestBookError?: string;
  message: string;
}) {
  const navigation = useNavigation();

  const dashboardRedirect = () => {
    console.log('Event target');
    // navigate('/Dashboard');
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1 className="sr-only">{message}</h1>
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <section className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <Button onClick={dashboardRedirect}>
              Click Me
            </Button>
            <Form
              method="post"
              className="space-y-4 w-full max-w-lg"
              onSubmit={(event) => {
                if (navigation.state === "submitting") {
                  event.preventDefault();
                }
                const form = event.currentTarget;
                requestAnimationFrame(() => {
                  form.reset();
                });
              }}
            >
              <input
                name="name"
                placeholder="Name"
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500 h-10 px-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={navigation.state === "submitting"}
                className="w-full h-10 px-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Sign Guest Book
              </button>
              {guestBookError && (
                <p className="text-red-500 dark:text-red-400">
                  {guestBookError}
                </p>
              )}
            </Form>
            <ul className="text-center">
              {<li className="p-3">{message}</li>}
              {guestBook.map(({ id, name }) => (
                <li key={id} className="p-3">
                  {name}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
