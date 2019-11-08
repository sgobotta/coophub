import * as React from 'react';
import {Suspense} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {CardDeck, Container, Row} from "reactstrap";
import useFetch from 'fetch-suspense';
import {ApiResponse, Repo, TotalLanguage} from "../types";
import RepoCard from "../components/RepoCard";
import FullWidthSpinner from "../components/FullWidthSpinner";
import LanguagesChart from '../components/LanguagesChart'; 
import _ from "lodash";

type ReposResponse = ApiResponse<[Repo]>
type urlProp = {url:string}

const RepoList: React.FC<urlProp> = ({url}) => {
    const response = useFetch(url) as ReposResponse;
    return <>
        {_.chunk(response.data, 3).map((row, i)=>
            <CardDeck key={i}>
                {row.map((repo, j)=><RepoCard repo={repo} key={i*10+j}/>)}
            </CardDeck>)}
    </>;
};


const HomePage: React.FC<RouteComponentProps> = () => {
    return <>
        <Container className="pt-xl-5">
            <Row>
                <Container className="col-6 mb-5">
                    <LanguagesChart url={"/api/languages"}/>    
                </Container>
            </Row>
            <div className="title-box text-center">
                <h3 className="title-a">
                Popular Repos
                </h3>
                <p className="subtitle-a">
                Most popular repos from coops
                </p>
                <div className="line-mf"/>
            </div>
            <Suspense fallback={<FullWidthSpinner/>}>
                <RepoList url={"/api/repos?limit=6&sort=popular"}/>
            </Suspense>
            <br />
            <br />
            <br />
            <div id="latest" className="title-box text-center">
                <h3 className="title-a">
                Latest Repos
                </h3>
                <p className="subtitle-a">
                What's cooking at cooperatives?
                </p>
                <div className="line-mf"/>
            </div>
            <Suspense fallback={<FullWidthSpinner/>}>
                <RepoList url={"/api/repos?limit=6&sort=latest"}/>
            </Suspense>
        </Container>
    </>;
};
export default HomePage
