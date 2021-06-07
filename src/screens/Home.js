import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import { Button, withTheme } from 'react-native-paper'

import ListaAluno from '../components/ListaAluno'

import Header from '../components/Header'

/* 

        "curso": "",
        "status": true,
        "nome": "",
        "dataMatricula": "",
        "cpf": "",

*/

function Home({ navigation, theme }) {
    const [carregando, setCarregando] = useState(false)
    const [data, setData] = useState([{}])

    async function obtemDados() {
        setCarregando(true)
        let uri = `https://backend-trabalho2.herokuapp.com/alunos`
        await fetch(uri)
            .then(response => response.json())
            .then(data => {

                setData(data)

            }).catch((err) =>alert(err.message))

        setCarregando(false)
    }

    useEffect(() => {
        obtemDados()
    }, [])

    return (
        <>
            <Header titulo='Alunos' back={false} config={true} navigation={navigation} />
            <View style={{
                justifyContent: 'center',
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}>

                {carregando && <ActivityIndicator size='large' color={theme.colors.primary} />}
                {data.length === 0 && !carregando ?
                    (
                        <View>
                            <Text>Não existem dados</Text>
                        </View>

                    ) : (

                        <ScrollView>

                            <View style={{margin:16}}>
                                {!carregando && <Button icon='cached' mode='outlined' onPress={()=>obtemDados()}>Recarregar</Button>}
                            </View>

                            {data.map((val,index) => {

                                return (
                                    <View key={index}>
                                        {!carregando && <ListaAluno data={val} />}                    
                                    </View>
                                )
                            })}
                        </ScrollView>
                    )
                }

            </View>
        </>
    )
}

export default withTheme(Home)