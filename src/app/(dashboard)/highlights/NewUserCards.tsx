"use client";

import { HorizontalCard } from "@/components/HorizontalCard";
import { useContextRecords } from "@/context/RecordsContext";
import { User } from "@/types/entities";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const NewUserCards = () => {
  const { data, setPageSize } = useContextRecords<User>();
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (setPageSize) {
      setPageSize(6);
    }
  }, [setPageSize]);

  useEffect(() => {
    if (data) {
      const initial = data.reduce(
        (acc, user) => ({ ...acc, [user.idUser]: true }),
        {} as Record<string, boolean>
      );
      setVisibleCards(initial);

      // Trigger animation after mount
      setTimeout(() => setHasLoaded(true), 10);
    }
  }, [data]);

  const handleClose = (id: string) => {
    setVisibleCards((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <Box sx={{display: "flex", justifyContent:"center"}}>

 <Box sx={{ maxWidth:"1000px", display: "flex", flexDirection: "row", gap: 2, flexWrap:"wrap", justifyContent:"center" }}>


      {data.map((item, i) =>
        visibleCards[item.idUser] ? (
            <Box
            key={item.idUser}
            sx={{
                
                opacity: hasLoaded ? 1 : 0,
                transform: hasLoaded ? "translateY(0)" : "translateY(10px)",
                transition: `all 400ms ease ${i * 100}ms`, // staggered animation
                height: "auto",
                //overflow: "hidden",
                mb: 2,
            }}
            >
            <HorizontalCard
              name={item.name}
              text={item.creationDate}
              open={true}
              onClose={() => handleClose(item.idUser)}
              />
          </Box>
        ) : null
    )}
    </Box>
    </Box>
  );
};
