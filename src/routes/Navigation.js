import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {AppContext} from '../themes/TProvider'

import Login from '../screens/Login'
import Tabs from './Tabs'

const Stack = createStackNavigator()

export default function Navigation(){
    const {tema} = React.useContext(AppContext)
    return(
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
                <Stack.Screen name='Tabs' component={Tabs} options={{headerShown:false}} />
                <Stack.Screen name='config' component={Login} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
