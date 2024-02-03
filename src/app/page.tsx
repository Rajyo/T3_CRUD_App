import { unstable_noStore as noStore } from "next/cache";
import Main from "./_components/main";


export default async function Home() {
  noStore();

  return (
    <>

      <main>
        <h1 className="flex justify-center text-5xl font-bold mt-10 mb-5">T3 CRUD App</h1>
        <Main />
      </main>

    </>
  );
}

