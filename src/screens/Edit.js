import React from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import { withTheme, Card, TextInput, Button, Avatar, Menu, Checkbox, Paragraph } from 'react-native-paper'

import Header from '../components/Header'

function Add({ navigation, theme }) {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [curso, setCurso] = useState('Curso Do Aluno')
    const [dataMat, setDataMat] = useState()
    const [status, setStatus] = useState(true)
    const [menuVisivel, setMenuVisivel] = useState(false)
    const [cardVisivel, setCardVisivel] = useState(false)

    function resetCampos() {
        setNome('')
        setCpf('')
        setCurso('Curso Do Aluno')
    }

    async function consultaAluno() {

        let uri = `https://backend-trabalho2.herokuapp.com/alunos`
        let uriAluno = `${uri}/${cpf}`

        await fetch(uriAluno)
            .then(response => response.json())
            .then(data => {
                let { nome, curso, dataMatricula } = data

                if (nome == undefined) {

                    alert('Este(a) aluno(a) não existe')
                    resetCampos()
                    return
                }

                setNome(nome)
                setCurso(curso)
                setDataMat(dataMatricula)
                setCardVisivel(true)


            }).catch(err => {
                console.log(err.message)
            })

    }

    async function editaDados() {

        if ((nome.trim()).length === 0) {
            alert('O nome do aluno é obrigatorio')
            setNome('')
            return
        }

        let dados = {

            curso: curso,
            status: status,
            nome: nome,
            cpf: cpf,
            dataMatricula: dataMat

        }

        let uri = `https://backend-trabalho2.herokuapp.com/alunos`

        await fetch(uri, {
            method: 'PUT',
            body: JSON.stringify(dados),
            headers: { "Content-type": 'application/json' }
        })
            .then(response => response.json())
            .then(data => {

                let { errors } = data

                if (errors == undefined) {
                    alert('Dados alterados com sucesso')
                    resetCampos()
                    setCardVisivel(false)
                    return
                }

            }).catch(err => {
                console.log(err.errors)
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
                <View >
                    {!cardVisivel &&
                    <Card style={{ padding: 8 }}>
                        <Card.Content>

                            <TextInput mode='outlined' disabled={cardVisivel} label='CPF' value={cpf} onChangeText={(text) => { setCpf(text) }} />
                            <Button mode='outlined' icon='magnify' onPress={() => {
                                consultaAluno()
                            }} >
                                Pesquisar
                            </Button>
                        </Card.Content>

                    </Card>
                    }
                </View>

                {cardVisivel &&
                    <Card style={{ paddingVertical: '4vh' }} >
                        <Card.Title title='Cadastre um novo aluno'
                            left={() => <Avatar.Icon size={8 * 6} icon='account-multiple-plus' />} />
                        <Card.Content>
                            <TextInput mode='outlined' label='Nome' value={nome}
                                onChangeText={text => setNome(text)} />
                            <Menu anchor={
                                <Button mode='outlined'
                                    icon='unfold-more-horizontal'
                                    onPress={() => setMenuVisivel(true)}>
                                    {curso}
                                </Button>
                            }
                                visible={menuVisivel}
                                onDismiss={() => setMenuVisivel(false)}>
                                <Menu.Item title='ADS' onPress={() => {
                                    setCurso('ADS')
                                    setMenuVisivel(false)
                                }} />
                                <Menu.Item title='Mecatronica' onPress={() => {
                                    setCurso('Mecatronica')
                                    setMenuVisivel(false)
                                }} />
                                <Menu.Item title='Eventos' onPress={() => {
                                    setCurso('Eventos')
                                    setMenuVisivel(false)
                                }} />
                                <Menu.Item title='Adm' onPress={() => {
                                    setCurso('Adm')
                                    setMenuVisivel(false)
                                }} />
                                <Menu.Item title='Economia' onPress={() => {
                                    setCurso('Economia')
                                    setMenuVisivel(false)
                                }} />
                            </Menu>
                            <View style={{ flexDirection: 'row', paddingTop: 8 }}>
                                <Paragraph>
                                    Esta Ativo:
                            </Paragraph>
                                <Checkbox status={status ? 'checked' : 'unchecked'}
                                    onPress={() => setStatus(!status)} />
                            </View>
                        </Card.Content>
                        <Card.Actions style={{ justifyContent: 'space-between' }}>
                            <Button icon='close' mode='contained' style={{ margin: 8, backgroundColor: 'red' }}
                                onPress={() => { setCardVisivel(false) }} >
                                Cancelar
                        </Button>
                            <Button icon='pencil' mode='contained' style={{ margin: 8 }}
                                onPress={() => { editaDados() }} >
                                Inserir
                        </Button>
                        </Card.Actions>
                    </Card>
                }
            </View>
        </>
    )
}

export default withTheme(Add)