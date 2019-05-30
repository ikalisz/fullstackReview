select firstname, email, user_id, balances.balance from users
join balances on balances.balance_id =  users.user_id
where user_id = ${id};