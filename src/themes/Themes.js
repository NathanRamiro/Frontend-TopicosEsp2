import {DefaultTheme, DarkTheme} from 'react-native-paper'

export const Light = {
    ...DefaultTheme,
    dark:false,
    colors:{
        ...DefaultTheme.colors,
        primary:'#3059CF',
        accent:'#597AD9',
        background:'#98abe7',
        surface:'#c1cdf0',
        text:'#232323',
    }
}

export const Dark ={
    ...DarkTheme,
    dark:true,
    colors:{
        ...DarkTheme.colors,
        primary:'#1D015F',
        accent:'#2C0191',
        background:'#01435F',
        surface:'#01145F',
        text:'#f3f3f3',
    }
}