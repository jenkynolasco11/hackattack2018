import React, { PureComponent as Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { Permissions, Contacts } from 'expo'

import { Scene, Router, Modal, Stack } from 'react-native-router-flux'

import Login from './screens/Login/Login'
import Recipients from './screens/AddRecipients/AddRecipients'
import Main from './screens/MapView/MapView'

const Navigator = () => {
    return (
        <Router getSceneStyle={ () => ({ backgroundColor : 'white' }) }>
            <Modal key="root" hideNavBar>
                <Stack key="app" hideNavBar>
                    <Scene key="login" component={ Login } initial />
                    <Scene key="map" component={ Main } panHandlers={ null } />
                </Stack>
                <Scene key="addPeople" component={ Recipients } panHandlers={ null } />
                <Scene key="verification" component={ Recipients } panHandlers={ null } />
                {/* <Stack key="addPeople" hideNavBar>
                    <Scene key="map" component={ Main } panHandlers={ null } clone/>
                </Stack> */}
            </Modal>
        </Router>
    )
}

class App extends Component{

    // componentDidMount = async () => {
    //     await Permissions.getAsync(Permissions.CONTACTS)
    //     await Permissions.getAsync(Permissions.CAMERA_ROLL)
    //     await Permissions.getAsync(Permissions.LOCATION)
    // }

    render() {
        return <Navigator />
    }
}

export default App
