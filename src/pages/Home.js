import { useContext, useEffect, useState } from 'react';
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from '../App';
import DiaryList from './../components/DiaryList';

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        // 리스트가 있을때만 수행
        if (diaryList.length >= 1) {
            const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
            const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // 마지막날의 마지막 시,분 ,초 까지  설정해 줘야 한다.

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    }, [curDate, diaryList]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    };

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    };

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;
