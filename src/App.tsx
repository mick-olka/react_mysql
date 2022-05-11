import React, {useEffect} from 'react';
import './styles/App.scss';
import {Routing} from "./routing";
import {Header} from "./components/Header/Header";
import {tablesApi} from "./store/tables/TablesAPI";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {setTablesList} from "./store/tables/teblesSlice";
import toast, {Toaster} from "react-hot-toast";
import {userApi} from "./store/user/UserAPI";
import {selectIsLogged, selectStatus, setLogged, setUser} from "./store/user/userSlice";

function App() {
    //  init data
    const logged = useAppSelector(selectIsLogged);
    const status = useAppSelector(selectStatus);
    const [fetchTablesList, {data, error, isLoading}] = tablesApi.useFetchAllTablesInfoMutation();
    const {data: authData, error: authErr, isLoading: loadingAuth} = userApi.useAuthCheckQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authData?.code === 0) {
            dispatch(setLogged(true));
            authData.user && dispatch(setUser(authData.user));
        }
        else dispatch(setLogged(false));
        if (authErr) toast('Not authorised');
    }, [authData, authErr]);

    useEffect(() => {
        if (data) dispatch(setTablesList(data.table.body));
        else logged && fetchTablesList();   //  fetch tables if logged
    }, [data, logged]);

    if (error) {
        return <div><h2>Error:</h2>{JSON.stringify(error, null, 2)}</div>
    }

    return (
        <div className="App">
            {isLoading || loadingAuth ? <div><h2>Loading...</h2></div> :
                <> <Header/>
                    <div className="content">
                        <Routing/>
                    </div>
                </>}
            <Toaster toastOptions={{className: 'my_toaster_styles'}} containerStyle={{left: 1000}}/>
        </div>
    );
}

export default App;
