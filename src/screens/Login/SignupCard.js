import React, { PureComponent as Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import * as Animatable from 'react-native-animatable'

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
    state = { phone : '3479742990', password : '12345', name : 'Jenky Nolasco',  }

    _onTextChange = (name, val) => this.setState({ [ name ] : val })

    _onSubmit = () => {}

    // componentDidUpdate = prevProps => {
    //     const { show } = this.props

    //     if(prevProps.show !== show) this.animatedView.fadeIn({ opacity : Number(show), marginRight : Number(!show) * width  }, 200, 'ease-in-out')
    // }

    render() {
        const { phone, password, name } = this.state
        const { show } = this.props

        return (
            <Animatable.View transition={['marginLeft', 'opacity']} style={{ width, opacity : show ? 1 : 0, alignItems : 'center', marginRight : show ? width : 0 }} easing="ease-in" duration={ 200 } >
                <View style={ styles.card }>
                    <CardTitle />
                    <Input value={ name } placeholder="Name" onChange={ val => this._onTextChange('name', val) } />
                    <Input value={ phone } placeholder="Phone Number" onChange={ val => this._onTextChange('phone', val) } />
                    <Input value={ password } placeholder="Password" onChange={ val => this._onTextChange('password', val) } secure />
                    <SubmitButton onSubmit={ this._onSubmit } />
                </View>
            </Animatable.View>
            //  <Animatable.View style={{ width, alignItems : 'center', marginLeft : width }} ref={ ref => this.animatedView = ref } >
            //     <View style={ styles.card }>
            //         <CardTitle />
            //         <Input value={ name } placeholder="Name" onChange={ val => this._onTextChange('name', val) } />
            //         <Input value={ phone } placeholder="Phone Number" onChange={ val => this._onTextChange('phone', val) } />
            //         <Input value={ password } placeholder="Password" onChange={ val => this._onTextChange('password', val) } secure />
            //         <SubmitButton onSubmit={ this._onSubmit } />
            //     </View>
            //  </Animatable.View>
        )
    }
}

export default SubmitCard
