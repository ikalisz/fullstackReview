update balances
set balance = balance + ${amount}
where balance_id = ${id}
returning balance;