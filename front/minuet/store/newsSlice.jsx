import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    news: {
        economic: [],
        life: [],
        science: [],
        social: [],
        world: [],
    }
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setEconmicNews: (state, action) => {
            state.news.economic = state.news.economic.concat(action.payload);
        },
        setLifeNews: (state, action) => {
            state.news.life = state.news.life.concat(action.payload);
        },
        setScienceNews: (state, action) => {
            state.news.science = state.news.science.concat(action.payload);
        },
        setSocialNews: (state, action) => {
            state.news.social = state.news.social.concat(action.payload);
        },
        setWorldNews: (state, action) => {
            state.news.world = state.news.world.concat(action.payload);
        },
    }
})

export default newsSlice.reducer
export const {setEconmicNews, setLifeNews, setScienceNews, setSocialNews, setWorldNews} = newsSlice.actions