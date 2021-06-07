/**
 * Um Header com titulo, subtitulo, BtnVoltar e BtnConfig
 * @property {back} bool ativa o botão de voltar
 * @property {config} bool ativa o botão de configurações
 * @property {title} String altera o titulo
 * @property {subtitle} String altera o subtitulo
 */

import React from 'react'
import { Appbar, withTheme } from 'react-native-paper'

function Header(props) {

    return (
        <Appbar>
            {props.back && <Appbar.BackAction onPress={() => props.navigation.goBack()} />}
            <Appbar.Content title={props.title} subtitle={props.subtitle} />
            {props.config && <Appbar.Action icon='cog' onPress={() => props.navigation.navigate('config')} />}
        </Appbar>
    )

}

export default withTheme(Header)