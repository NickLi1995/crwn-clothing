import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const SignInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const SignInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

export const SignOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const SignOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = userCredentials => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, addtionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, addtionalData }
})

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})