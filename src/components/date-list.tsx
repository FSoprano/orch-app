// orch-app/src/components/member-list.tsx

// Import deps
import React from 'react';

// Import components
import { DateListRow } from './date-list-row';

// Import styles
import './../styles/date-list.css'

// Create interfaces
interface DateUI {
  id: number;
  termin: any;   
}

interface DateListUI {
  dates: DateUI[];
  loading: boolean;
  handleDateRemove: (id: number, termin: any) => void;
}

// Create DateList component
export const DateList = (props: DateListUI) => {
  // Show loading message
  if (props.loading) return <p>Dates table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Termin</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.dates.length > 0 ? (
            props.dates.map((date: DateUI, idx) => (
              <DateListRow
                key={date.id}
                date={date}
                position={idx + 1}
                handleDateRemove={props.handleDateRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={3}>Noch keine Termine. Bitte eintragen</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
