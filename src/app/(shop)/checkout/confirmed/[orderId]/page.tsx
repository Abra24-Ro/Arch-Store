import { redirect } from "next/navigation";
import { ConfirmedOrder } from "./ui/ConfirmedOrder";

interface Props {
  params: { orderId: string };
}

export default async function ConfirmedPage({ params }: Props) {
  const { orderId } = await params;

  if (!orderId) redirect("/");

  return <ConfirmedOrder orderId={orderId} />;
}
