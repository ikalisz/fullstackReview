const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    balance: null,
    id: null
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'

function reducer (state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER:
            return {
                ...state,
                username: action.username,
                firstname: action.firstname,
                lastname: action.lastname,
                balance: action.balance,
                id: action.balance
            }
        case CLEAR_USER:
            return {
                username: '',
                firstname: '',
                lastname: '',
                balance: null,
                id: null
            }
        default: 
            return state
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        balance: user.balance,
        id: user.id
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}


export default reducer