import Form from './Form';

const page = () => {
  return (
    <div className="grid place-content-center min-h-svh bg-purple-500">
      <section className="grid gap-5 rounded-xl shadow-xl bg-white max-w-[30rem] mx-auto p-10">
        <article className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Victoria 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Let&apos;s get you right to it. Please provide your login detials to
            continue.
          </p>
        </article>
        <Form />
      </section>
    </div>
  );
};

export default page;
