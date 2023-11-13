import { useState } from 'react';

const sortOptionList = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된 순' },
];
const filterOptionList = [
    { value: 'all', name: '전부다' },
    { value: 'good', name: '좋은 감정만' },
    { value: 'bad', name: ' 안 좋은 감정만' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
};

const DiaryList = ({ diaryList }) => {
    const [sortType, setSortType] = useState('lastest');
    const [filter, setFilter] = useState('all');

    // 원본 배열을 바꾸지 않기 위한 List 복사 작업(sort 메소드를 사용하면 원본 배열이 바뀌기 때문에!)
    const getProcessDiaryList = () => {
        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        };
        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryList));

        const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div>
            <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
            <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
            {getProcessDiaryList().map((it) => (
                <div key={it.id}>
                    {it.content} {it.emotion}
                </div>
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
