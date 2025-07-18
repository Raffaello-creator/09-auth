import { fetchNotesServer } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  const title = `NoteHub - ${tag} notes`;
  const description = `Review of notes filtered by category: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://09-auth-beige.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview",
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] || "";
  const response = await fetchNotesServer(
    "",
    1,
    10,
    tag === "All" ? undefined : tag
  );

  return <NotesClient initialData={response} tag={tag} />;
}
