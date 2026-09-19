import { useEffect, useState } from "react";

export interface ProjectStatus {
  id: string;
  url: string;
  up: boolean;
  status: number | null;
  ms: number;
  reason?: string;
}

const useProjectStatus = () => {
  const [statuses, setStatuses] = useState<Record<string, ProjectStatus>>({});

  useEffect(() => {
    let cancelled = false;

    fetch("/.netlify/functions/project-status")
      .then(async (res) => {
        if (!res.ok) return;
        const json = (await res.json().catch(() => undefined)) as
          | { results?: ProjectStatus[] }
          | undefined;
        if (cancelled || !json?.results) return;

        setStatuses(
          Object.fromEntries(json.results.map((result) => [result.id, result])),
        );
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return statuses;
};

export default useProjectStatus;
