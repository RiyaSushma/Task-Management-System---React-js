export const login_user = () => {
    return (dispatch) => {
        dispatch(
            {
                type: 'Login'
            }
        )
    }
}

export const logout_user = () => {
    return (dispatch) => {
        dispatch({
            type: 'Logout'
        })
    }
}