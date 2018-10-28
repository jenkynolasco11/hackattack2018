import React, { PureComponent as Component } from 'react'
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native'

import LoginCard from './LoginCard'
import SignupCard from './SignupCard'

import styles from './styles'

const AppTitle = () => {
    return (
        <View style={{ flex : 1.5, justifyContent : 'center', alignItems : 'center' }}>
            <Text style={ styles.appTitleText }> App Name </Text>
        </View>
    )
}

const CardSection = ({ isRegister }) => {
    return (
        <View style={{ flex : 2 }}>
            <View style={{ flex : 1, flexDirection : 'row', alignItems : 'center', justifyContent : 'center' }}>
                <LoginCard show={ !isRegister } />
                <SignupCard show={ isRegister } />
            </View>
        </View>
    )
}

class Login extends Component{
    state = { isRegister : false }

    _onRegisterPress = () => this.setState({ isRegister : !this.state.isRegister })

    render() {
        return (
            <View style={{ flex : 1 }}>
                <KeyboardAvoidingView style={ styles.container } behavior="padding">
                    <AppTitle />
                    <CardSection isRegister={ this.state.isRegister } />
                </KeyboardAvoidingView>
                <View style={{ height : 80, alignItems : 'center', justifyContent : 'center' }}>
                    <TouchableOpacity onPress={ this._onRegisterPress } activeOpacity={ 0.5 }>
                        <Text>{ this.state.isRegister ? 'Or Login' : 'Or Register' }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login
