import './App.css'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import MainNavigator from './navigation'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainNavigator />
                </PersistGate>
            </Provider>
        </div>
    )
}

export default App
