import React from 'react'
import { useState } from 'react'
import { View} from 'react-native'
import { withTheme, TextInput, Button} from 'react-native-paper'

import Header from '../components/Header'

function Add({ navigation, theme }) {

    const [cpf, setCpf] = useState('')

    async function deletaAluno() {

        let uri = `https://backend-trabalho2.herokuapp.com/alunos`
        let uriAluno = `${uri}/${cpf}`

        await fetch(uriAluno,{
            method:'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                let {message} = data

                if(message){
                    alert(message)
                } else{
                    alert('O aluno não existe')
                }
                    

            }).catch(err => {
                alert('Este aluno não existe')
            })

    }

    return (
        <>
            <Header back={false} config={true} title='Editar Alunos' />
            <View style={{
                justifyContent: 'center',
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}>
                <View style={{ padding: 8}}>
                    <TextInput mode='outlined' label='CPF' value={cpf} onChangeText={(text) => { setCpf(text) }} />
                    <Button style={{backgroundColor:'red'}} mode='contained' icon='delete' onPress={() => {
                        deletaAluno()
                    }} >
                        Deletar
                    </Button>
                </View>
            </View>
        </>
    )
}

export default withTheme(Add)