import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionsList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let totalExpenses = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        totalExpenses += eachTransaction.amount
      }
    })
    return totalExpenses
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let totalIncome = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        totalIncome += eachTransaction.amount
      }
    })
    return totalIncome
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let totalExpenses = 0
    let totalIncome = 0
    let totalAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        totalIncome += eachTransaction.amount
      } else {
        totalExpenses += eachTransaction.amount
      }
    })

    totalAmount = totalIncome - totalExpenses

    return totalAmount
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state

    const totalAmount = this.getBalance()
    const totalIncome = this.getIncome()
    const totalExpenses = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            totalAmount={totalAmount}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
          <div className="transaction-details">
            <form onSubmit={this.onAddTransaction} className="transaction-form">
              <h1 className="transaction-header">Add Transaction</h1>
              <label htmlFor="title" className="input-label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                placeholder="TITLE"
                className="input"
              />
              <label htmlFor="amount" className="input-label">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                placeholder="AMOUNT"
                className="input"
              />
              <label htmlFor="select" className="input-label">
                TYPE
              </label>
              <select
                id="select"
                value={optionId}
                onChange={this.onChangeOptionId}
                className="input"
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key="eachTransaction.id"
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
