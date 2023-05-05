import * as actionTypes from '../constants/userConstant';


export const authReducer = (state = { user: null, loading:false, message:null, error:null }, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_USER:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.REGISTER_USER:
            return{
                ...state,
                loading:false,
                user: action.payload,
                message:null,
                error:null
            }
        case actionTypes.REGISTER_USER_FAIL:
            return{
                ...state,
                user:null,
                loading:false,
                error: action.payload,
            }
        
            case actionTypes.LOGIN_USER:
                return{
                    ...state,
                    loading:false,
                    user: action.payload,
                    error:null
                }
            case actionTypes.LOGIN_USER_FAIL:
                return{
                    ...state,
                    user:null,
                    loading:false,
                    error: action.payload,
                }
            case actionTypes.FORGOT_PASSWORD:
                return{
                    ...state,
                    message:action.payload,
                    loading:false,
                    error:null
                }
            case actionTypes.FORGET_PASSWORD_FAIL:
                return{
                    ...state,
                    error:action.payload,
                    loading:false,
                    message:null,
                }
             case actionTypes.GET_PASSWORDRESET:
                return{
                    ...state,
                    message:action.payload,
                    loading:false,
                    error:null
                }
              case actionTypes.GET_PASSWORDRESET_FAIL:
                return{
                    ...state,
                    error:action.payload,
                    loading:false,
                    message:null,
                }

        default:
            return state;

    }
}