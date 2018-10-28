import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Scene, Router, Modal, Stack } from 'react-native-router-flux'

import Login from './screens/Login/Login'

const Navigator = () => {
    return (
        <Router getSceneStyle={ () => ({ backgroundColor : 'white' }) }>
            <Modal key="root">
                <Stack key="app" hideNavBar>
                    <Scene key="login" component={ Login } initial />
                </Stack>
                <Scene key="addPeople" component={ () => <View /> } />
            </Modal>
        </Router>
    )
}

const App = () => {
    // return (
    //     <View style={{ flex : 1, alignItems : 'center', justifyContent : 'center' }}>
    //         <Text> Hi </Text>
    //     </View>
    // )
    return <Navigator />
}

export default App
