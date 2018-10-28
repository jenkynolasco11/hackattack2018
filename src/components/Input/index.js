import React, { PureComponent as Component } from 'react'
import { TextInput, View, Animated, Easing } from 'react-native'

import constants from '../../constants/styles_constants'

class Input extends Component{
    state = { isFocused : new Animated.Value(+!!this.props.value) }

    _onFocus = () => {
        const { isFocused } = this.state
        const { value } = this.props

        const shouldFocus = !Boolean(isFocused._value)

        const toValue = Number(shouldFocus)

        if(!value.length) {
            Animated.timing(isFocused, {
                toValue,
                duration : 200,
                easing : Easing.inOut(Easing.cubic),
            }).start()
        }
    }

    componentDidMount = () => this._onFocus()

    render() {
        const { placeholder, onChange, value, secure, textStyle } = this.props
        const { isFocused } = this.state

        const width = isFocused.interpolate({
            inputRange : [0, 1],
            outputRange : ['0%', '100%']
        })

        return(
            <View style={{ alignSelf : 'stretch', height : 40, alignItems : 'center', marginTop : 10, marginBottom : 10, marginLeft : 5, marginRight : 5 }}>
                <TextInput
                    style={[{ width : '100%', height : 38, fontSize : 20, color : 'rgba(0,0,0,0.5)', fontWeight : '200' }, textStyle ]}
                    value={ value }
                    onChangeText={ onChange }
                    onFocus={ this._onFocus }
                    onBlur={ this._onFocus }
                    placeholder={ placeholder }
                    secureTextEntry={ secure }
                />
                <Animated.View style={{ width, height : 2, backgroundColor : constants.primaryColor, opacity : 0.2 }} />
                {/* <View style={{ width, height : 2, backgroundColor : 'rgba(0,0,0,0.5)', position : 'absolute', bottom : 0 }} /> */}
            </View>
        )
    }
}

Input.defaultProps = {
    placeholder : 'text placeholder',
    value : '',
    secure : false,
    textStyle : {},
    onChange : () => {}
}

export default Input
