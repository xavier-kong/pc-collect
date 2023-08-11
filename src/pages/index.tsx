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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Button } from "~/components/ui/button";
import { useState } from "react";

type CardStatus = 'collected' | 'otw' | 'looking' | 'uncollected';

function Card() {
  const era = 'black';
  const type = 'inclusion';
  const shop = 'bicycle';
  const name = 'ace';
  const [ cardStatus, setCardStatus ] = useState<CardStatus>('uncollected');

  const handleCardStatus = (status: CardStatus) => {
    const currCardStatus = cardStatus;
    if (currCardStatus === status) {
      setCardStatus('uncollected');
    } else {
      setCardStatus(status);
    }
  }


  return (
    <div className="rounded-lg md:border md:h-36 md:w-64 h-14 w-14">
      <div className="hidden md:block">
        <div className="flex flex-row gap-2 group">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/530px-Ace_of_spades.svg.png" className="object-contain h-14 max-w-full md:h-36 rounded-lg"/>
          <div>
            <p>Era: {era}</p>
            <p>Type: {type}</p>
            <p>Shop: {shop}</p>
            <p>Name: {name}</p>
            <p>Status: {cardStatus}</p>
          </div>
          <div className="p-1">
            <DropdownMenu>
              <DropdownMenuTrigger>          
                <div className="group-hover:block hidden">
                  <DotsVerticalIcon className="scale-150 border-none" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCardStatus('collected')}>Collected</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCardStatus('otw')}>On The Way</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCardStatus('looking')}>Looking</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <div className="flex flex-row gap-4">
                  <div className="pr-6">
                    <p>Era: {era}</p>
                    <p>Type: {type}</p>
                    <p>Shop: {shop}</p>
                    <p>Name: {name}</p>
                    <p>Status: {cardStatus}</p>
                  </div>
                  <div className="pl-6 flex flex-col">
                    <Button onClick={() => handleCardStatus('collected')}>Collected</Button>
                    <Button onClick={() => handleCardStatus('otw')}>On The Way</Button>
                    <Button onClick={() => handleCardStatus('looking')}>Looking</Button>
                  </div>
                </div>
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
