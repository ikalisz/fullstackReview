insert into balances (balance) values (0) returning balance;
insert into users (firstname, lastname, email) values (${firstname}, ${lastname}, ${email});
insert into user_login (username, password) values (${username}, ${password})
RETURNING *;