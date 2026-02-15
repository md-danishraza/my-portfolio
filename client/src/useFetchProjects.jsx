import React, { useEffect, useState } from "react";
import { createClient } from "contentful";

function useFetchProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, SetProjects] = useState();

  useEffect(() => {
    const client = createClient({
      space: import.meta.env.VITE_SPACE,
      environment: "master", // defaults to 'master' if not set
      accessToken: import.meta.env.VITE_API,
    });
    client
      .getEntries({ content_type: "projects" })
      .then((response) => {
        // console.log(response.items);
        SetProjects(response.items.reverse());
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return { loading, projects };
}

export default useFetchProjects;
