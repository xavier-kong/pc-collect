import Head from "next/head";
import { api } from "~/utils/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { MultiSelectComboBox } from '../components/multi-select-combo-box';
import { Input } from "~/components/ui/input"

type CardStatus = 'collected' | 'otw' | 'looking' | 'uncollected';

interface Card {
  era: string, type: 'inclusion' | 'pob', shop: string, name: string, imgUrl: string, status: CardStatus
}

function Card({ era, type, shop, name, imgUrl, status = 'uncollected' }: Card) {
  const [ cardStatus, setCardStatus ] = useState<CardStatus>(status);

  const handleCardStatus = (status: CardStatus) => {
    const currCardStatus = cardStatus;
    if (currCardStatus === status) {
      setCardStatus('uncollected');
    } else {
      setCardStatus(status);
    }
  }

  const cardStatuses: { status: CardStatus, name: string}[] = [{ status: 'collected', name: 'Collected' }, { status: 'otw', name: 'On The Way'}, { status: 'looking', name: 'Looking' }];

  return (
    <div className="rounded-lg md:border md:h-36 md:w-64 h-14 w-14">
      <div className="hidden md:block">
        <div className="flex flex-row gap-2 group">
          <img src={imgUrl} className="object-contain h-14 max-w-full md:h-36 rounded-lg"/> <div> <p>Era: {era}</p>
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
                {cardStatuses.map((status) => (<DropdownMenuItem key={status.status} onClick={() => handleCardStatus(status.status)}>{status.name}</DropdownMenuItem>))}
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
                    {cardStatuses.map((status) => (<Button key={status.status} variant={cardStatus === status.status ? 'destructive' : null} onClick={() => handleCardStatus(status.status)}>{status.name}</Button>))}
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
  const [ eraFilter, setEraFilter ] = useState<string[]>([]);
  const [ typeFilter, setTypeFilter ] = useState<string[]>([]);
  const [ shopFilter, setShopFilter ] = useState<string[]>([]);
  const [ statusFilter, setStatusFilter ] = useState<string[]>([]);
  const [ searchFilter, setSearchFilter ] = useState<string>("");

  const fakeData = Array.from({ length: 50}, () => [
    {
      era: 'black',
      type: 'inclusion' as Card["type"],
      shop: 'bicycle',
      name: 'ace',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/530px-Ace_of_spades.svg.png',
      status: 'looking' as CardStatus
    },
    {
      era: 'red',
      type: 'pob' as Card["type"],
      shop: 'bee',
      name: 'king',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/King_of_hearts_fr.svg/185px-King_of_hearts_fr.svg.png',
      status: 'otw' as CardStatus
    },
  ]).flat();

  function checkSearch(card: Card, search: string): boolean {
    const keys = Object.keys(card);

    for (const key of keys) {
      if (key === 'status' || key === 'type') {
        continue;
      }

      const eraString = card.era.toLowerCase();
      const shopString = card.shop.toLowerCase();
      const nameString = card.shop.toLowerCase();

      const searchString = search.toLowerCase();

      if (
        eraString.includes(searchString) ||
        shopString.includes(searchString) ||
        nameString.includes(searchString)
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen items-center justify-center">
        <div className="flex flex-row items-center align-middle pt-6 justify-center">
          <MultiSelectComboBox options={['pob', 'inclusion']} name="Type" selected={typeFilter} setSelected={setTypeFilter} />
          <MultiSelectComboBox options={[...new Set(fakeData.map(data => data.era))]} name="Era" selected={eraFilter} setSelected={setEraFilter} />
          <MultiSelectComboBox options={[...new Set(fakeData.map(data => data.shop))]} name="Shop" selected={shopFilter} setSelected={setShopFilter} />
          <MultiSelectComboBox options={['collected', 'otw', 'looking', 'uncollected']} name="Status" selected={statusFilter} setSelected={setStatusFilter} />
          <div className="w-96">
            <Input type="search" placeholder="Search..." onChange={(e) => { setSearchFilter(e.currentTarget.value)}} value={searchFilter} />
          </div>
        </div>
        <div className="grid grid-cols-4 p-5 gap-4 md:grid-cols-6 md:p-16">
          {
            fakeData
            .filter((card: Card) => eraFilter.length > 0 ? eraFilter.includes(card.era) : true)
            .filter((card: Card) => typeFilter.length > 0 ? typeFilter.includes(card.type) : true)
            .filter((card: Card) => shopFilter.length > 0 ? shopFilter.includes(card.shop) : true)
            .filter((card: Card) => statusFilter.length > 0 ? statusFilter.includes(card.status) : true)
            .filter((card: Card) => searchFilter.length > 0 ? checkSearch(card, searchFilter) : true)
            .map((data: Card) => <Card key={fakeData.indexOf(data)} {...data}/>)
          }
        </div>
      </main>
    </>
  );
}
