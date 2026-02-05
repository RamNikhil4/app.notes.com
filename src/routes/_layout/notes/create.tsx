import { createFileRoute } from "@tanstack/react-router";
import { CreateNotePage } from "../../../components/pages/CreateNotePage";

export const Route = createFileRoute("/_layout/notes/create")({
  component: CreateNotePage,
});
