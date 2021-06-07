import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Avatar} from 'react-native-paper'

const Tab = createBottomTabNavigator()

import Home from '../screens/Home'
import Add from '../screens/Add'
import Edit from '../screens/Edit'
import Delete from '../screens/Delete'


export default function Tabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}
            options={{
                tabBarIcon:()=>(
                    <Avatar.Icon icon='account-box' size={8*3} color='white' />
                )
            }} />
            <Tab.Screen name='Add' component={Add}
            options={{
                tabBarIcon:()=>(
                    <Avatar.Icon icon='plus' size={8*3} color='white' />
                )
            }} />
            <Tab.Screen name='Edit' component={Edit}
            options={{
                tabBarIcon:()=>(
                    <Avatar.Icon icon='pencil' size={8*3} color='white' />
                )
            }} />
            <Tab.Screen name='Delete' component={Delete}
            options={{
                tabBarIcon:()=>(
                    <Avatar.Icon icon='delete-forever' size={8*3} color='white' />
                )
            }} />
        </Tab.Navigator>
    )
    
}