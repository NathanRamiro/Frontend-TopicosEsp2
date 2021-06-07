import React from 'react'
import {View} from 'react-native'
import {withTheme, Card, TextInput, Button, Avatar} from 'react-native-paper'

function Login({navigation,theme}){

    return(
        <View style={{
            justifyContent:'center',
            display:'flex',
            flex:1,
            flexDirection:'column'
        }}>
            <Card style={{paddingVertical:'4vh'}} >
                <Card.Title title='BD Aluno' 
                subtitle='Essa tela não faz nada'
                left={()=><Avatar.Icon size={8*6} icon='badge-account-horizontal' />} />
                <Card.Content>
                    <TextInput mode='outlined' label='Login' />
                    <TextInput mode='outlined' label='Senha' />
                </Card.Content>
                <Card.Actions style={{justifyContent:'flex-end'}}>
                    <Button mode='contained' icon='login' style={{margin:8}}
                    onPress={()=>{navigation.navigate('Tabs')}} >
                         Login 
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

export default withTheme(Login)