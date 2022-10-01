import './App.css'
import store from './store'
import { Provider } from 'react-redux'
import MainNavigator from './navigation'

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        </div>
    )
}

export default App
