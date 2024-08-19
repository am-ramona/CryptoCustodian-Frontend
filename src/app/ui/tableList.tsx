import React, { ReactNode } from 'react'

interface TableData {
    date?: Date | string;
    [key: string]: string | number | Date | ReactNode | any;
}

interface ResponsiveTableProps {
    titles: Array<string>;
    data: TableData[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ titles, data }) => {
    const columns = Object.keys(data[0] || {});

    return (
        <div className="overflow-x-auto w-full max-h-80 h-80 overflow-y-auto overflow-x-visible p-0 mx-0 mt-8 mb-20 scrollbar-thumb-green scrollbar-gutter-both-edges scrollbar-thin m-6 space-y-4 border-y border-grey-light">
            <ul aria-label="Table list" className="min-w-full divide-y divide-gray-200">
                <li aria-labelledby="List header" className="sticky top-0 flex bg-grey-mid p-2 text-grey-dark font-semibold">
                    {titles.map((title, index) => (
                        <span key={`header-${index}`} className="flex-1 p-2">{title}</span>
                    ))}
                </li>

                {/* Data Rows */}
                {data.map((item, rowIndex) => (
                    <li aria-labelledby="List content" key={rowIndex} className="flex p-2 border-b border-gray-200">
                        {columns.map((column, colIndex) => (
                            <span key={colIndex} className="flex-1 p-2">
                                {item[column] !== undefined ? item[column] : '-'}
                            </span>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ResponsiveTable
