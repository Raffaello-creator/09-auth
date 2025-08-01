import { fetchNoteById } from "@/lib/api/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {id && <NotePreviewClient id={id} />}
    </HydrationBoundary>
  );
}
