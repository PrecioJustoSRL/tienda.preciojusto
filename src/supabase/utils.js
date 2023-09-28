import { supabase } from './config'

//--------------------------Authentications----------------------------------

const onAuth = async (setUserProfile,) => {

    console.log('onAuth')

        await supabase.auth.refreshSession()


    supabase.auth.onAuthStateChange(async (event, session) => {

        console.log('onAuthStateChange')
        if (session) {
            console.log(session)

            const { data, error } = await supabase
                .from('Users')
                .select()
                .eq('uuid', session.user.id)
            console.log(error)
            console.log(data)
            if (error && error.code === 'PGRST301') {
                console.log('error.code')
                setUserProfile(null)
                return
            }
            data !== null && data !== undefined && data.length
                ? setUserProfile(data[0])
                : setUserProfile(session.user)
            return
        }
        setUserProfile(null)
    })
}

const signUpWithEmailAndPassword = async (email, password, setUserProfile) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    setUserProfile(data.user)

    return data
}

const signInWithEmailAndPassword = async (email, password, setUserSuccess) => {
    const result = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    result.data.user == null && setUserSuccess('AccountNonExist')
}

const signOut = async (email, password) => {
    const { error } = await supabase.auth.signOut()
}


const passwordResset = async (new_password) => {
    await supabase.auth.updateUser({ password: new_password })
}



const passwordRedirect = async (email) => {
    const data = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://tienda.preciojusto.pro/Resset',
    })
}


//--------------------------CRUD----------------------------------

const writeUserData = async (rute, object, uuid, context, updateContext, setUserSuccess, msg, key) => {

    const result = await supabase
        .from(rute)
        .insert(object)
    console.log(result)
    setUserSuccess ? setUserSuccess(msg) : ''
    result.status == 201 && updateContext ? readUserData(rute, uuid, updateContext) : (setUserSuccess ? setUserSuccess(msg) : '')
    // console.log(result)
    return result
}
// ('Users', session.user.id, {}, setUserProfile, null, { uuid: session.user.id, rol: undefined })

const getUserData = async (setUserProfile) => {
    const { data, error } = await supabase
        .from('Users')
        .select()
        .eq('uuid', "420a5562-ad2e-41df-a566-3f74cb90a65e")
    console.log(data)
    console.log(error)
    data !== null && data !== undefined && data.length
        ? setUserProfile(data[0])
        : setUserProfile(session.user)
    return
}


const getSpecificData = async (rute, eq, uuid, updateContext, eq2, uuid2) => {
    const { data, error } = await supabase
        .from(rute)
        .select()
        .eq(eq, uuid)
        .eq('message', 'Correcto')
        .eq(eq2, uuid2)

    // .gt(gt, value)
    console.log(data)
    let value = data.length > 0
        ? data.reduce((acc, i) => {
            return i.id > acc.id ? i : acc
        }, { id: -1 })
        : null
    updateContext(value)
    // console.log(data)
    // console.log(error)
}

const readUserData = async (rute, uuid, updateContext, eq,) => {
    const result = await supabase
        .from(rute)
        .select()
        .eq(eq ? eq : 'uuid', uuid)
        console.log(result)
        console.log(result.data.lenght)
console.log(result.data.length === 1)
    if (updateContext) {
        result.data !== null && result.data.length !== 0
            ? (result.data.length === 1 ? updateContext(result.data[0]) : updateContext(result.data))
            : updateContext(null)
    }
    // console.log(result)
    return result.data
}

const readUserDataEq = async (rute, eq, uuid, updateContext, eq2, value) => {
    const result = await supabase
        .from(rute)
        .select()
        .eq(eq ? eq : 'uuid', uuid)
        .eq(eq2, value)


    if (updateContext) {
        result.data !== null && result.data.length !== 0
            ? (result.data.lenght > 1 ? updateContext(result.data[0]) : updateContext(result.data))
            : updateContext(null)
    }
    // console.log(result)
    return result.data
}

const readUserAllData = async (rute, context, updateContext) => {

    const result = await supabase
        .from(rute)
        .select()
    console.log(result)
    return updateContext(result.data)

}

const updateUserData = async (rute, object, uuid, eq) => {
    const result = await supabase
        .from(rute)
        .update(object)
        .eq(eq ? eq : 'uuid', uuid)

    console.log(result)
}


const deleteUserData = async (rute, uuid, eq) => {
    const { error } = await supabase
        .from(rute)
        .delete()
        .eq(eq ? eq : 'uuid', uuid)


}

export { onAuth, signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut, passwordResset, passwordRedirect, writeUserData, readUserData, deleteUserData, updateUserData, readUserAllData, getUserData, getSpecificData, readUserDataEq }






   // if (result.data.user !== null && result.data.user.id) {
    //     console.log(session.user.id)
    //     console.log('session')
    //     const { data } = supabase
    //         .from('Users')
    //         .select()
    //         .eq('uuid', result.data.user.id)
    //     console.log(data)
    //     data !== null && data !== undefined  && data.length
    //         ? setUserProfile(data[0])
    //         : setUserProfile(session.user)
    //     return
    // } else {
    //     return setUserProfile(null)
    // }




    // if (window.localStorage && await window.localStorage.getItem('sb-hhxlyesjmtbhnqwsoplw-auth-token') !== undefined) {
          
    //     console.log('localStorage')
    //         const res = await window.localStorage.getItem('sb-hhxlyesjmtbhnqwsoplw-auth-token')
    //         console.log(res)
    //         const db = await JSON.parse(res)
    //         console.log(db)
    //        await supabase.auth.refreshSession()

    //         const result = await supabase
    //             .from('Users')
    //             .select()
    //             .eq('uuid', db.user.id)
    //         console.log(result)
    //         if (result.error) {
    //             console.log('error.code')
    //             setUserProfile(null)
    //             return
    //         }
    //         result.data !== null && result.data !== undefined && result.data.length
    //             ? setUserProfile(result.data[0])
    //             : setUserProfile(db.user)
    //         return
    //     }