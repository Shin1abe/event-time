import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../../../ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDiamond, faXmark } from '@fortawesome/free-solid-svg-icons';

// サンプルデータ
const eventDate = [
    { eventDate: '2023-05-08' },
    { eventDate: '2023-05-22' },
];

// selections の型定義
interface Selections {
    [key: string]: '○' | '◇' | '×';
}

const SelectOption: React.FC = () => {
    const [selections, setSelections] = useState<Selections>({});

    const handleSelection = (date: string, selection: '○' | '◇' | '×') => {
        setSelections((prev) => ({
            ...prev,
            [date]: selection,
        }));
        console.log("selections", selections);
    };

    const getClassName = (date: string, selection: '○' | '◇' | '×', baseClass: string, selectedClass: string) => {
        return selections[date] === selection ? selectedClass : baseClass;
    };

    return (
        <Table>
            <TableBody>
                {eventDate.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{data.eventDate}</TableCell>
                        <TableCell className='text-center'>
                            <FontAwesomeIcon
                                icon={faCircle}
                                className={`cursor-pointer ${getClassName(data.eventDate, '○', 'text-blue-200', 'text-blue-600')}`}
                                style={{ width: '16px', height: '16px' }}
                                onClick={() => handleSelection(data.eventDate, '○')}
                            />
                        </TableCell>
                        <TableCell className='text-center'>
                            <FontAwesomeIcon
                                icon={faDiamond}
                                className={`cursor-pointer ${getClassName(data.eventDate, '◇', 'text-yellow-200', 'text-yellow-600')}`}
                                style={{ width: '16px', height: '16px' }}
                                onClick={() => handleSelection(data.eventDate, '◇')}
                            />
                        </TableCell>
                        <TableCell className='text-center'>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={`cursor-pointer ${getClassName(data.eventDate, '×', 'text-red-200', 'text-red-600')}`}
                                style={{ width: '16px', height: '16px' }}
                                onClick={() => handleSelection(data.eventDate, '×')}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default SelectOption;
