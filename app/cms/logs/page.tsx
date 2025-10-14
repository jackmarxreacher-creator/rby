"use client";

import { useState, useEffect } from "react";
import { LogsTable } from "./_components/LogsTable";

export default function LogsPageClient() {
  const [logs, setLogs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [actions, setActions] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Fetch logs from server (implement your API or server action endpoint)
  async function fetchLogs() {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      userId: userFilter,
      action: actionFilter,
    });

    const res = await fetch(`/api/logs?${params.toString()}`);
    const data = await res.json();
    setLogs(data.logs);
    setTotalCount(data.totalCount);
    setUsers(data.allUsers); // Should send all users for dropdown
    setActions(data.allActions); // Should send all distinct actions for dropdown
  }

  useEffect(() => {
    fetchLogs();
  }, [page, userFilter, actionFilter]);

  function onFilterChange(newUserId: string, newAction: string) {
    setUserFilter(newUserId);
    setActionFilter(newAction);
    setPage(1);
  }

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <h1 className="mb-6 text-3xl font-bold text-[#1c1c1c]"></h1>
      <LogsTable
        logs={logs}
        totalCount={totalCount}
        users={users}
        actions={actions}
        initialUserFilter={userFilter}
        initialActionFilter={actionFilter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}
