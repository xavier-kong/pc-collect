import Head from "next/head";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

function Card() {
  const era = 'black';
  const type = 'inclusion';
  const shop = 'bicycle';
  const name = 'ace';

  return (
    <div className="rounded-lg md:border md:h-36 md:w-52 h-14 w-14">

      <div className="hidden md:block">
        <div className="flex flex-row gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/530px-Ace_of_spades.svg.png" className="object-contain h-14 max-w-full md:h-36 rounded-lg"/>
          <div>
            <p>Era: {era}</p>
            <p>Type: {type}</p>
            <p>Shop: {shop}</p>
            <p>Name: {name}</p>
          </div>
        </div>
      </div>

      <div className="md:hidden block">
        <Dialog>
          <DialogTrigger>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/530px-Ace_of_spades.svg.png" className="object-contain h-14 max-w-full md:h-36 rounded-lg"/>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Card Info</DialogTitle>
              <DialogDescription>
                <p>Era: {era}</p>
                <p>Type: {type}</p>
                <p>Shop: {shop}</p>
                <p>Name: {name}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen items-center justify-center">
        <div className="grid grid-cols-4 p-5 gap-4 md:grid-cols-6 md:p-16">
          {
            Array(100).fill(0).map((i: number) => <Card key={i}/>)
          }
        </div>
      </main>
    </>
  );
}
