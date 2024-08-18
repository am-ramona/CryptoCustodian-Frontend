import React from 'react';

interface TableData {
    [key: string]: any;
    //   name: string;
    //   symbol: string;
    //   token: string;
    //   amount: string | number;
    //   date: Date | string;
}

interface ResponsiveTableProps {
    titles: Array<string>;
    data: TableData[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ titles, data }) => {
    const columns = Object.keys(data[0] || {});

    return (
        <div className="overflow-x-auto w-full max-h-80 h-80 overflow-y-auto overflow-x-visible p-5 scrollbar-thumb-green scrollbar-gutter-both-edges scrollbar-thin m-6 space-y-4 border-y border-grey-light">
            <ul className="min-w-full divide-y divide-gray-200">
                <li className="flex bg-gray-100 p-2 text-gray-700 font-semibold">
                    {titles.map((title) => (
                        <span className="flex-1 p-2">{title}</span>
                    ))}
                </li>

                {/* Data Rows */}
                {data.map((item, rowIndex) => (
                    <li key={rowIndex} className="flex p-2 border-b border-gray-200">
                        {columns.map((column, colIndex) => (
                            <span key={colIndex} className="flex-1 p-2">
                                {item[column] !== undefined ? item[column] : '-'}
                            </span>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResponsiveTable;
