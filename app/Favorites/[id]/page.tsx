import React from 'react'
import ReactMarkdown from 'react-markdown';
import { prisma } from '@/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type PageParams = {
  id: string;
};

type Props = {
  params: Promise<PageParams>;
};

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const { id } = await props.params;
  const response = await prisma.favorites.findUnique({
    where: { id },
  });

  return {
    title: response?.title || `Recipe Not Found`,
    description: 'View your saved recipe',
  };
}

export default async function Page(props: Props) {
  const { id } = await props.params;
  const response = await prisma.favorites.findUnique({
    where: { id }
  });

  if(!response){
    return (
      <main className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn&apos;t find the recipe you&apos;re looking for.</p>
        <Link href="/Favorites" className="text-blue-500 hover:underline">
          Return to Favorites
        </Link>
      </main>
    )
  }

  const title = response.title;
  const content = response.content;
  
  return (
    <main className='flex flex-col items-center justify-start'>
      <div className='pt-7 p-2 m-2 sm:w-[1000px] w-screen bg-slate-100 rounded-xl shadow-2xl'>
        <ReactMarkdown className='text-xl pb-3'>{title}</ReactMarkdown>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </main>
  )
}