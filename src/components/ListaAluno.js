import React from 'react'
import { } from 'react-native'
import { Card, withTheme, TextInput, Avatar } from 'react-native-paper'

function ListaAluno({ data, theme }) {

    let {dataMatricula} = data
    let dtMat = new Date(dataMatricula)
     

    return (
        <>

            <Card>
                <Card.Title title={data.nome} subtitle={data.cpf}
                    left={() => <Avatar.Icon icon='account' size={8 * 6} />} />
                <Card.Content>

                    <TextInput label='Data de Matricula' disabled={true} value={dtMat.toLocaleDateString()} />
                    <TextInput label='Curso' disabled={true} value={data.curso} />

                </Card.Content>
            </Card>

        </>
    )
}

export default withTheme(ListaAluno)