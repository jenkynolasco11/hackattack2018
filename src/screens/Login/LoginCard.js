import React, { PureComponent as Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Actions } from 'react-native-router-flux'
import Axios from 'axios'

import Input from '../../components/Input'

import constants from '../../constants/styles_constants'

import styles from './styles'

const { width } = Dimensions.get('window')

const CardTitle = () => {
    return (
        <View style={{ height : 40, justifyContent : 'center' }}>
            <Text style={{ fontSize : 20, color : 'rgba(0,0,0,0.5)' }}>Enter Phone Number</Text>
        </View>
    )
}

const SubmitButton = ({ onSubmit = () => {} }) => {
    return (
        <View style={{ alignSelf : 'stretch', marginTop : 14, marginBottom : 14, alignItems : 'center', justifyContent : 'center' }}>
            <TouchableOpacity onPress={ onSubmit } activeOpacity={ 0.75 } style={{ height : 40, width : 140, backgroundColor : constants.primaryColor, borderRadius : 4, alignItems : 'center', justifyContent : 'center' }}>
                <Text style={{ color : 'white', fontSize : 16, }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

class LoginCard extends Component{
    state = { phone : '3479742990', password : '12345' }

    _onTextChange = (name, val) => this.setState({ [ name ] : val })

    _onSubmit = async () => {
        const { phone } = this.state

        const URL = `https://starwarshackattack2018.pythonanywhere.com/api/v1/users/api-token/?format=json`

        const body = { phone_number : phone, auth_token : `${ Math.floor(Math.random() * 10000) + 1000 }` }
        const config = { headers : { 'Content-Type' : 'application/json' }}

        try {
            console.log({ body })
            // const { data } = await Axios.post(URL, body, config)
            // console.log({ data })

            return Actions.push('map')
        } catch (err) {
            console.log({ err })
        }
    }

    // componentDidUpdate = prevProps => {
    //     const { show } = this.props

    //     // console.log('Login => ', { show })

    //     if(prevProps.show !== show) this.animatedView.transitionTo({ opacity : Number(!show), marginleft : Number(!show) * width  }, 200, 'ease-in-out')
    // }

    // componentDidMount = () => this.animatedView.fadeIn({ opacity : 1 })

    render() {
        const { phone, password } = this.state
        const { show } = this.props

        return (
            <Animatable.View transition={['marginLeft', 'opacity']} style={{ width, opacity : show ? 1 : 0, alignItems : 'center', marginLeft : show ? width : 0 }} easing="ease-in-out" duration={ 200 }>
                <View style={ styles.card }>
                    <CardTitle />
                    <Input value={ phone } placeholder="3475551235" onChange={ val => this._onTextChange('phone', val) } />
                    {/* <Input value={ password } placeholder="Password" onChange={ val => this._onTextChange('password', val) } secure /> */}
                    <SubmitButton onSubmit={ this._onSubmit } />
                </View>
            </Animatable.View>
            // <Animatable.View style={{ width, alignItems : 'center' }} ref={ ref => this.animatedView = ref } >
            //     <View style={ styles.card }>
            //         <CardTitle />
            //         <Input value={ phone } placeholder="Phone Number" onChange={ val => this._onTextChange('phone', val) } />
            //         <Input value={ password } placeholder="Password" onChange={ val => this._onTextChange('password', val) } secure />
            //         <SubmitButton onSubmit={ this._onSubmit } />
            //     </View>
            // </Animatable.View>
        )
    }
}

export default LoginCard
