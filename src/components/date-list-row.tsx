// orch-app/src/components/date-list-row.tsx

import React from 'react';

// Typescript interface for props:
interface DateListRowUI {
  position: number;
  date: {
    id: number;
    termin: any;
    }
    handleDateRemove: (id: number, termin: any) => void;
}

// Create MemberListRow component

export const DateListRow = (props: DateListRowUI) => (
  <tr className="date-table-row">
  
    <td className="date-table-item">
      {props.position}
    </td>
    
    <td className="date-table-item">
      {props.date.termin}
    </td>
    
    <td className="date-table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleDateRemove(props.date.id, props.date.termin)}>
        Remove date
      </button>
    </td>
    
  </tr>
)
