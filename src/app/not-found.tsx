import NotFound404 from "@/components/UI/404NotFound";

export default function Custom404() {
  return (
    <div>
      <NotFound404 />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Page not found, sorry about that!
        </p>
      </div>
    </div>
  );
}
