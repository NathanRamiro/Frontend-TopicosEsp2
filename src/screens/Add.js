import React from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import { withTheme, Card, TextInput, Button, Avatar, Menu, Checkbox } from 'react-native-paper'

import Header from '../components/Header'

import isCpfValido from '../components/IsCpfValido'

function Add({ navigation, theme }) {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [curso, setCurso] = useState('Curso Do Aluno')
    const [status, setStatus] = useState(true)
    const [menuVisivel, setMenuVisivel] = useState(false)

    function resetCampos(){
        setNome('')
        setCpf('')
        setCurso('Curso Do Aluno')
    }

    async function enviaDados() {

        let dtMat = new Date();

        if((nome.trim()).length===0){
            alert('O nome do aluno é obrigatorio')
            setNome('')
            return
        }

        if(!isCpfValido(cpf)){
            alert('CPF invalido')
            setCpf('')
            return
        }

        if(curso==='Curso Do Aluno'){
            alert('Selecione um curso')
            return
        }

        let dados = {

            curso: curso,
            status: status,
            nome: nome,
            dataMatricula: dtMat,
            cpf: cpf

        }

        let uri = `https://backend-trabalho2.herokuapp.com/alunos`
        let uriAluno = `${uri}/${cpf}`

        await fetch(uriAluno)
        .then(response=>response.json())
        .then(data=>{

            if(data.cpf===cpf){

                alert('Esse(a) aluno(a) ja foi cadastrado(a)')
                    resetCampos()
            }

        }).catch(err=>{
            alert(err.message)
        })
        
        await fetch(uri,{
            method:'POST',
            body:JSON.stringify(dados),
            headers:{"Content-type":'application/json'}
        })
        .then(response=> response.json())
        .then(data=>{

            
            if(cpf===data.cpf){
                alert('Aluno Cadastrado com sucesso')
                resetCampos()
            }

        }).catch(err=>{
            alert(err.errors)
        })

    }

    return (
        <>
            <Header back={false} config={true} title='Cadastrar Alunos' />
            <View style={{
                justifyContent: 'center',
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}>
                <Card style={{ paddingVertical: '4vh' }} >
                    <Card.Title title='Cadastre um novo aluno'
                        left={() => <Avatar.Icon size={8 * 6} icon='account-multiple-plus' />} />
                    <Card.Content>
                        <TextInput mode='outlined' label='Nome' value={nome}
                            onChangeText={text => setNome(text)} />
                        <TextInput mode='outlined' label='CPF' value={cpf}
                            onChangeText={text => setCpf(text)} />
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
                            Esta Ativo:
                        <Checkbox status={status ? 'checked' : 'unchecked'}
                                onPress={() => setStatus(!status)} />
                        </View>
                    </Card.Content>
                    <Card.Actions style={{ justifyContent: 'center' }}>
                        <Button mode='contained' style={{ margin: 8 }}
                            onPress={() => enviaDados()} >
                            Cadastrar
                    </Button>
                    </Card.Actions>
                </Card>
            </View>
        </>
    )
}

export default withTheme(Add)