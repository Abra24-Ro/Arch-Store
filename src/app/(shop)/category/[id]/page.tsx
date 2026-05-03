import { notFound } from "next/navigation";




interface Props {
  params: {
    id: string;
  };
}

export default async function PageCategory({ params }: Props) {
  const { id } = await params;

  if (id === "men") notFound();

  return (
    <div className="page-container py-8">
      <div>PageCategory {id}</div>
    </div>
  );
}