import * as actionTypes from '../constants/userConstant';


export const userReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return{
                ...state,
                user: action.payload,
            }
        case actionTypes.GET_USER_FAIL:
            return{
                ...state,
                user:null,
                error: action.payload,
            }
        
         

        default:
            return state;

    }
}