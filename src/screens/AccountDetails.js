// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Subscribe } from 'unstated'
import AccountsStore from '../stores/AccountsStore'
import AppStyles from '../styles'
import AccountIcon from '../components/AccountIcon'
import AccountDetailsCard from '../components/AccountDetailsCard'
import QrView from '../components/QrView'
import Button from '../components/Button'
import colors from '../colors';

export default class AccountDetails extends Component {
  render () {
    return (
      <Subscribe to={[AccountsStore]}>{
        (accounts) => <AccountDetailsView { ...this.props } accounts={ accounts } />
      }
      </Subscribe>
    )
  }
}

class AccountDetailsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showQr: false
    }
  }

  static navigationOptions = {
    title: 'Account Details'
  }

  state: {
    showQr: false
  }

  // componentWillUnmount() {
  //   this.props.accounts.select('')
  // }

  render () {
    const account = this.props.accounts.getSelected()
    if (!account) {
      return null
    }
    return (
      <ScrollView contentContainerStyle={ styles.bodyContent } style={ styles.body }>
        <Text style={ styles.title }>ACCOUNT</Text>
        <AccountDetailsCard
          address={ account.address }
          title={ account.name }
          onPress={ () => this.props.navigation.navigate('AccountEdit') } />
        { this.state.showQr
          ? <View style={styles.qr}>
              <QrView text={account.address} />
            </View>
          : <Button textStyles={{color: colors.card_bg_text}}
              buttonStyles={{ backgroundColor: colors.card_bg }}
              title="Show Account QR Code"
              onPress={ () => { this.setState({showQr: true})} }/>
        }
        <Button textStyles={{color: colors.card_bg_text}}
              buttonStyles={{ backgroundColor: colors.card_bg }}
              title="Check PIN"
              onPress={ () => {
                this.props.navigation.navigate('AccountUnlock')
              }}/>
      </ScrollView>
  )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colors.bg
  },
  bodyContent: {
    paddingBottom: 40,
  },
  title: {
    color: colors.bg_text_sec,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingBottom: 20
  },
  wrapper: {
    borderRadius: 5
  },
  address: {
    flex: 1
  },
  qr: {
    flex: 1,
    backgroundColor: colors.card_bg,
  },
  deleteText: {
    fontFamily: 'Roboto',
    textAlign: 'right'
  },
  changePinText: {
    textAlign: 'left',
    color: 'green'
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  actionButtonContainer: {
    flex: 1
  }
})