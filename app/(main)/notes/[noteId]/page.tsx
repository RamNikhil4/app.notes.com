import { NoteDetailsPage } from "@/components/pages/NoteDetailsPage";

interface NoteDetailsProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { noteId } = await params;
  return <NoteDetailsPage noteId={noteId} />;
}
