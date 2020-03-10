import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getBalance,
  getFinanceData,
} from '../../redux/finance/financeSelectors';

import styles from './Balance.module.css';

class Balance extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    financeData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  state = {};

  render() {
    const windowWidth = document.documentElement.clientWidth;
    const { balance, financeData } = this.props;
    const expenses = financeData
      .filter(q => q.type === 'expense')
      .reduce((acc, value) => {
        return acc + value.amount;
      }, 0);
    const income = financeData
      .filter(q => q.type === 'income')
      .reduce((acc, value) => {
        return acc + value.amount;
      }, 0);
    return (
      <>
        <h5 className={styles.title}>Balance {windowWidth >= 768 && ':'}</h5>{' '}
        <p className={styles.amount}>
          {Number(balance - expenses + income)} UAH
        </p>
      </>
    );
  }
}

const mapStateToProps = state => ({
  balance: getBalance(state),
  financeData: getFinanceData(state),
});

export default connect(mapStateToProps)(Balance);
