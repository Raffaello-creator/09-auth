import { NextResponse } from "next/server";
import { api } from "@/app/api/api";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

export async function GET(_: Request, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;

  try {
    const { data } = await api(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;

  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;
  const body = await request.json();

  try {
    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}
