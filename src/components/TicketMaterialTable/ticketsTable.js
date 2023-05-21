import React from 'react';
import MaterialTable from 'material-table';

function TicketsTable(props) {
    return (
        <MaterialTable
            onRowClick={(event, rowdata) => props.editTicket(rowdata)}
            columns={[
                { title: 'TICKET-ID', field: '_id' },
                { title: 'TITLE', field: 'title' },
                { title: 'DESCRIPTION', field: 'description' },
                { title: 'REQUESTOR', field: 'requestor' },
                { title: 'PRIORITY', field: 'ticketPriority' },
                { title: 'ASSIGNEE', field: 'assignee' },
                { title: 'STATUS', field: 'status' }

            ]}
            title={props.title}
            data={props.ticketDetails}

            options={{
                sorting: true,
                rowStyle: {
                    backgroundColor: "blanchedalmond",
                    Cursor: "pointer"
                }
            }}
        />
    )
}

export default TicketsTable
