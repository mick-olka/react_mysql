import React, {useEffect} from 'react';
import './styles/App.scss';
import {Routing} from "./routing";
import {Header} from "./components/Header/Header";
import {tablesApi} from "./store/tables/TablesAPI";
import {useAppDispatch} from "./hooks/hooks";
import {setTablesList} from "./store/tables/teblesSlice";

function App() {

    //  init data
    const {data: tablesList, error, isLoading} = tablesApi.useFetchAllTablesInfoQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (tablesList) dispatch(setTablesList(tablesList));
    }, [tablesList]);

    if (error) {
        return <div><h2>Error:</h2>{JSON.stringify(error)}</div>
    }

    return (
        <div className="App">
            {isLoading ? <div><h2>Loading...</h2></div> :
                <><Header/>
                <div className="content">
                    <Routing/>
                </div>
            </>}
        </div>
    );
}

export default App;
