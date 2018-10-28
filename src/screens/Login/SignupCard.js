import React, { PureComponent as Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as Animatable from 'react-native-animatable'
import Axios from 'axios'

import Input from '../../components/Input'

import constants from '../../constants/styles_constants'

import styles from './styles'

const { width } = Dimensions.get('window')

const CardTitle = () => {
    return (
        <View style={{ height : 40, justifyContent : 'center' }}>
            <Text style={{ fontSize : 20, color : 'rgba(0,0,0,0.5)' }}>Sign Up</Text>
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

class SubmitCard extends Component{
    state = { phone : '3479742990', name : 'Jenky', lastname : 'Nolasco'  }

    _onTextChange = (name, val) => this.setState({ [ name ] : val })

    _onSubmit = async () => {
        const { name, lastname, phone } = this.state
        const URL = `https://starwarshackattack2018.pythonanywhere.com/api/v1/users/login/?format=json`

        const body = { first_name : name, last_name : lastname, phone_number : phone }
        const config = { headers : { 'Content-Type' : 'application/json' }}

        try {
            // const res = await Axios.post(URL, body, config)

            // console.log({res})

            return Actions.addPeople()
        } catch (err) {
            console.log({ err })
        }

    }

    // componentDidUpdate = prevProps => {
    //     const { show } = this.props

    //     // console.log('Sign up => ', { show })

    //     if(prevProps.show !== show) this.animatedView.transitionTo({ opacity : Number(!show), marginRight : Number(!show) * width  }, 200, 'ease-in-out')
    // }

    render() {
        const { phone, password, name, lastname } = this.state
        const { show } = this.props

        return (
            <Animatable.View transition={['marginLeft', 'opacity']} style={{ width, opacity : show ? 1 : 0, alignItems : 'center', marginRight : show ? width : 0 }} easing="ease-in" duration={ 200 } >
                <View style={ styles.card }>
                    <CardTitle />
                    <View style={{ flexDirection : 'row', width : '100%' }}>
                        <View style={{ flex : 1 }}>
                            <Input value={ name } placeholder="First Name" onChange={ val => this._onTextChange('name', val) } />
                        </View>
                        <View style={{ flex : 1 }}>
                            <Input value={ lastname } placeholder="Last Name" onChange={ val => this._onTextChange('lastname', val) } />
                        </View>
                    </View>
                    <Input value={ phone } placeholder="Phone Number" onChange={ val => this._onTextChange('phone', val) } />
                    {/* <Input value={ password } placeholder="Password" onChange={ val => this._onTextChange('password', val) } secure /> */}
                    <SubmitButton onSubmit={ this._onSubmit } />
                </View>
            </Animatable.View>
            // <Animatable.View style={{ width, alignItems : 'center', marginLeft : width }} ref={ ref => this.animatedView = ref } >
            //     <View style={ styles.card }>
            //         <CardTitle />
            //         <Input value={ name } placeholder="Name" onChange={ val => this._onTextChange('name', val) } />
            //         <Input value={ phone } placeholder="Phone Number" onChange={ val => this._onTextChange('phone', val) } />
            //         <Input value={ password } placeholder="Password" onChange={ val => this._onTextChange('password', val) } secure />
            //         <SubmitButton onSubmit={ this._onSubmit } />
            //     </View>
            // </Animatable.View>
        )
    }
}

export default SubmitCard
