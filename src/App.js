import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false
};

const reducer = function (state, action) {
  switch (action.type) {
    case "openAccount": {
      return {
        ...state,
        isActive: true
      };
    }
    case "deposit": {
      return {
        ...state,
        balance: state.balance + action.payload
      };
    }
    case "withdraw": {
      return {
        ...state,
        balance:
          state.balance < 50 ? state.balance : state.balance - action.payload
      };
    }
    case "loan": {
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload
      };
    }
    case "payLoan": {
      return {
        ...state,
        loan: 0
      };
    }
    case "closeAccount": {
      return {
        ...state,
        isActive: state.loan === 0 ? false : state.isActive,
        balance: state.loan === 0 ? 0 : state.balance
      };
    }
    default: {
      throw new Error("unknown action");
    }
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, isActive } = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "loan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

