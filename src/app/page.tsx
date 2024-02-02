import { unstable_noStore as noStore } from "next/cache";
import Main from "./_components/main";


export default async function Home() {
  noStore();

  return (
    <>

      <main>
        <h1 className="flex justify-center text-4xl font-bold my-10">T3 CRUD App</h1>
        <Main />
      </main>

    </>
  );
}

