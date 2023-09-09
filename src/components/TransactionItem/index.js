// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteButton = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">{amount}</p>
      <p className="transaction-text">{type}</p>
      <din className="delete-container">
        <button
          type="button"
          onClick={onDeleteButton}
          className="delete-button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </din>
    </li>
  )
}

export default TransactionItem
