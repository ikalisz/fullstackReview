module.exports = {
    deposit: async (req, res) => {
        const {session} = req
        const {amount} = req.body
        const db = req.app.get('db')
        if (session.user) {
            const result = await db.deposit_amount({id: session.user.id, amount})
            session.user = {
                ...session.user,
                balance: result[0].balance
            }
            return res.status(200).send(session.user)
        }
        return res.status(401).send('Please Log In')
    },
    withdrawl: async (req, res) => {
        const {session} = req
        const {amount} = req.body
        const db = req.app.get('db')
        if (session.user) {
            if (session.user.balance - amount < 0) return res.status(500).send('You do not have the funds to make that withdrawl')
            const balance = await db.withdrawl_amount({amount, id: session.user.id})
            session.user = {
                ...session.user,
                balance: balance[0].balance
            }
            return res.status(200).send(session.user)
        }
        return res.status(401).send('Please Log In')
    }
}