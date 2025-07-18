import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbar,            // value export
} from '@mui/x-data-grid';

import type {
  GridColDef,
  GridRenderCellParams,      // type-only import
} from '@mui/x-data-grid';

import {
  ref,
  query,
  limitToLast,
  onValue,
} from 'firebase/database';
import type { DatabaseReference } from 'firebase/database'; // type-only

import { db } from '../firebase';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type LogLevel = 'ALL' | 'INFO' | 'DEBUG' | 'ERROR';

interface LogRow {
  id: string;
  ts: number;
  level: 'INFO' | 'DEBUG' | 'ERROR';
  tag: string;
  msg: string;
  userId: string;
}

interface Props {
  appName: string;
  level: LogLevel;
  onFilterChange: (l: LogLevel) => void;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export default function LogsTable({ appName, level }: Props) {
  const [rows, setRows] = useState<LogRow[]>([]);

  // ---------- Firebase listener ------------------------------------
  useEffect(() => {
    if (!appName) return;

    const q = query(
      ref(db, `apps/${appName}/logs`),
      limitToLast(500),
    ) as unknown as DatabaseReference;

    const off = onValue(q, snap => {
      const out: LogRow[] = [];

      snap.forEach(userSnap =>
        userSnap.forEach(sessSnap =>
          sessSnap.forEach(logSnap => {
            const v = logSnap.val();
            if (level !== 'ALL' && v.level !== level) return;

            out.push({
              id: logSnap.key!,
              ts: v.ts,
              level: v.level,
              tag: v.tag,
              msg: v.msg,
              userId: userSnap.key!,
            });
          }),
        ),
      );

      setRows(out.reverse());
    });

    return () => off();
  }, [appName, level]);

  // ---------- Column defs ------------------------------------------
  const columns: GridColDef[] = [
    {
        field: 'ts',
        headerName: 'Time',
        width: 170,
        valueFormatter: (params: any) => {
          if (!params || params.value == null) return '';
          const ms = Number(params.value) * 1000;
          return Number.isNaN(ms)
            ? String(params.value)
            : new Date(ms).toLocaleString();
        },
    },
    {
      field: 'level',
      headerName: 'Level',
      width: 100,
      renderCell: ({ value }: GridRenderCellParams) => {
        const color =
          value === 'ERROR' ? '#d32f2f'
          : value === 'INFO' ? '#1976d2'
          : '#424242';
        return (
          <span style={{ color, fontWeight: 600 }}>
            {String(value ?? '').toUpperCase()}
          </span>
        );
      },
    },
    { field: 'tag',   headerName: 'Tag',   width: 120 },
    {
        field: 'msg',
        headerName: 'Message',
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams) => (
          <div style={{
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            lineHeight: 1.4,
            maxHeight: '6em',
            overflowY: 'auto'
          }}>
            {params.value}
          </div>
        ),
      }
      ,
    { field: 'userId', headerName: 'User',  width: 130 },
  ];  

  return (
    <div
      style={{
        height: 500,
        width: '100%',
        maxWidth: '1250px',   // prevents page from stretching too wide
        margin: '0 auto',     // centers the table
        padding: 16,
        overflowX: 'auto'     // allows horizontal scroll if needed
      }}
    >
      <DataGrid
        autoHeight                      
        rows={rows}
        columns={columns}
        density="compact"
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
        getRowClassName={(p) =>
          p.row.level === 'ERROR'
            ? 'row-error'
            : p.row.level === 'INFO'
            ? 'row-info'
            : ''
        }
      />
    </div>
  );
  
}
