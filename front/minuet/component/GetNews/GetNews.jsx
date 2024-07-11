import { getDatabase, ref, onValue } from "firebase/database"
import { useDispatch } from "react-redux";
import { setEconmicNews, setLifeNews, setScienceNews, setSocialNews, setWorldNews } from "../../store/newsSlice";

const GetNews = () => {

    const dispatch = useDispatch()

    const section = ['economic', 'life', 'science', 'social', 'world'];

    section.forEach((sec) => {
        const db = getDatabase();
        const chatRef = ref(db, `news_data/${sec}`);

        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const news_data = Object.values(data);
                // console.log(`${sec} data:`, news_data);
                // 여기서 news_data를 어떻게 활용할지에 따라서 작업을 진행하세요
                if (sec === 'economic') {
                    dispatch(setEconmicNews(news_data))
                }
                else if (sec === 'life') {
                    dispatch(setLifeNews(news_data))
                }
                else if (sec === 'science') {
                    dispatch(setScienceNews(news_data))
                }
                else if (sec === 'social') {
                    dispatch(setSocialNews(news_data))
                }
                else if (sec === 'world') {
                    dispatch(setWorldNews(news_data))
                }
            } else {
                console.log(`No ${sec} data`);
            }
        });
    });
}

export default GetNews