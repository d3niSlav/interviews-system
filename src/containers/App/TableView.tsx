import React, { FunctionComponent } from 'react';

import Table, { TablePageConfig } from '../../components/Table';

const TableView: FunctionComponent = () => {
  const totalPages = 30;
  const data = [
    {
      firstName: 'Deni',
      lastName: 'Enchev',
      age: 25,
    },
    {
      firstName: 'Deni',
      lastName: 'Enchev',
    },
    {
      firstName: 'Deni',
      lastName: 'Enchev',
      age: 12,
    },
    {
      firstName: 'Deni',
      lastName: 'Enchev',
    },
  ];

  const onPageConfigChange = (data: TablePageConfig): void => {
    console.log(data);
  };

  return (
    <div className="paper">
      <Table<{
        firstName: string;
        lastName: string;
        age?: number;
      }>
        autoResetPage={false}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        fetchData={onPageConfigChange}
        pageCount={totalPages}
        manualPagination
        manualSortBy
        columns={[
          {
            Header: 'First name',
            accessor: 'firstName',
            disableSortBy: true,
          },
          {
            Header: 'Last name',
            accessor: 'lastName',
            disableSortBy: true,
          },
          {
            Header: 'Age',
            accessor: 'age',
            Cell: ({ cell: { value } }) => value || '-',
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default TableView;
