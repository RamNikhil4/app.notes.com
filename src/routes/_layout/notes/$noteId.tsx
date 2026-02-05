import { createFileRoute } from "@tanstack/react-router";
import { NoteDetailsPage } from "../../../components/pages/NoteDetailsPage";

export const Route = createFileRoute("/_layout/notes/$noteId")({
  component: NoteDetailsPage,
});
