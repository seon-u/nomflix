import React, { Component } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

export default class extends Component {
    state = {
        topRated : null,
        popular : null,
        airingToday : null,
        loading : true,
        error : null
    };

    componentDidMount = async () => {
        try {
            const { data : { results : topRated } } = await tvApi.topRated();
            const { data : { results : popular } } = await tvApi.popular();
            const { data : { results : airingToday } } = await tvApi.airingToday();

            console.log(topRated, popular, airingToday);
            this.setState({
                topRated,
                popular,
                airingToday
            });
        } catch(err) {
            console.log('TVContainer.js componentDidMount error : ', err);

            this.setState({ error : 'Cant find TV information.' });
        } finally {
            this.setState({ loading : false });
        }
    };

    render() {
        const { topRated, popular, airingToday, loading, error } = this.state;
        console.log(this.state);

        return <TVPresenter topRated={ topRated } popular={ popular } airingToday={ airingToday } loading={ loading } error={ error } />;
    };
};