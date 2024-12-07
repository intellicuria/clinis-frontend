import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Response, ModuleCategory } from "@/types/module.types";
import { ModuleInformation } from "@/types/module.types";

export default function ServerSearch({ open, setOpen }) {
  const [moduleData, setModuleData] = useState(null);
  const [catgories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();

    // Cleanup function to cancel any pending requests if component unmounts
    return () => {
      // Add cleanup logic here if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      {moduleData && (
        <Search
          moduleData={moduleData}
          catgories={catgories}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
