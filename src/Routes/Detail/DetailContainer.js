import React, { Component } from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends Component {
    constructor(props) {
        super(props);

        const { location : { pathname } } = props;
        
        this.state = {
            result : null,
            loading : true,
            error : null,
            isMovie : pathname.includes('/movie/')
        };
    };

    componentDidMount = async () => {
        const { match : { params : { id } }, history : { push }, location : { pathname } } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        
        if(isNaN(parsedId)) {
            return push('/');
        }

        let result = null;
        
        try {
            if(isMovie) {
                const request = await moviesApi.movieDetail(parsedId);
                result = request.data;
            } else {
                const request = await tvApi.showDetail(parsedId);
                result = request.data;
            }
        } catch(err) {
            console.log('DetailContainer.js componentDidMount error : ', err);

            this.setState({ error : 'Cant find anything.' });
        } finally {
            this.setState({ loading : false, result });
        }
    };

    render() {
        const { result, loading, error } = this.state;
        console.log(this.state);

        return <DetailPresenter result={ result } loading={ loading } error={ error } />;
    };
};