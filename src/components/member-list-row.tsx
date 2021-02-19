// orch-app/src/components/member-list-row.tsx

import React from 'react';

// Typescript interface for props:
interface MemberListRowUI {
  position: number;
  member: {
    id: number;
    name: string;
    vorname: string;
    strasse: string;
    plz: string;
    ort: string;
    fnetz: string;
    mobil: string;
    email: string;    
    }
    handleMemberRemove: (id: number, name: string) => void;
  
  }

// Create MemberListRow component

export const MemberListRow = (props: MemberListRowUI) => (
  <tr className="member-table-row">
    <td className="member-table-item">
      {props.position}
    </td>
    
    <td className="member-table-item">
      {props.member.name}
    </td>
    
    <td className="member-table-item">
      {props.member.vorname}
    </td>
    
    <td className="member-table-item">
      {props.member.strasse}
    </td>
    
    <td className="member-table-item">
      {props.member.plz}
    </td>
    
    <td className="member-table-item">
      {props.member.ort}
    </td>
    
    <td className="member-table-item">
      {props.member.fnetz}
    </td>
    
    <td className="member-table-item">
      {props.member.email}
    </td>
    
    <td className="member-table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleMemberRemove(props.member.id, props.member.name)}>
        Remove Member
      </button>
    </td>
  </tr>
)
