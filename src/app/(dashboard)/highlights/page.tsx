"use client";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { HorizontalCard } from "@/components/HorizontalCard";
import { useState } from "react";
const initialData = [
  { id: 1, name: "Alice", text: "Frontend Developer" },
  { id: 2, name: "Bob", text: "Backend Engineer" },
  { id: 3, name: "Charlie", text: "UI/UX Designer" },
];
export default function Home() {
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>(() =>
    initialData.reduce((acc, item) => ({ ...acc, [item.id]: true }), {} as Record<number, boolean>)
  );

  const handleClose = (id: number) => {
    setVisibleCards((prev) => ({ ...prev, [id]: false }));
  };
  return (
    <BodyWraper>
      <p>Home</p>

      {initialData.map((item) => (
        <HorizontalCard
          key={item.id}
          name={item.name}
          text={item.text}
          open={visibleCards[item.id]}
          onClose={() => handleClose(item.id)}
        />
      ))}
    </BodyWraper>
  );
}
