// orch-app/src/components/member-list.tsx

// Import deps
import React from 'react';

// Import components
import { MemberListRow } from './member-list-row';

// Import styles
import './../styles/member-list.css'

// Create interfaces
interface MemberUI {
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

interface MemberListUI {
  members: MemberUI[];
  loading: boolean;
  handleMemberRemove: (id: number, name: string) => void;
}

// Create MemberList component
export const MemberList = (props: MemberListUI) => {
  // Show loading message
  if (props.loading) return <p>Member table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Name</th>

            <th className="table-head-item">Vorname</th>

            <th className="table-head-item">Strasse</th>

            <th className="table-head-item">Rating</th>
            
            <th className="table-head-item">PLZ</th>
            
            <th className="table-head-item">Festnetz</th>
            
            <th className="table-head-item">Mobil</th>
            
            <th className="table-head-item">E-Mail</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.members.length > 0 ? (
            props.members.map((member: MemberUI, idx) => (
              <MemberListRow
                key={member.id}
                member={member}
                position={idx + 1}
                handleMemberRemove={props.handleMemberRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={10}>There are no members to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
