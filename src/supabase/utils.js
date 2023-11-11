import { supabase } from './config'

//--------------------------Authentications----------------------------------

const onAuth = (setUserProfile, router) => {

    console.log('onAuth')
    const data = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('onAuthStateChange')
        if (session) {
            console.log(session.user.id)
            console.log('session')
            // session.user.id && router && router.push('/Cliente')
            const { data, error } = await supabase
                .from('Users')
                .select()
                .eq('uuid', session.user.id)
            console.log(data)
            console.log(error)
            data !== null && data !== undefined  && data.length
                ? setUserProfile(data[0])
                : setUserProfile(session.user)
                return
        } 
             setUserProfile(null)
        
    })
    // data.data.subscription.callback( async (event, session) => {
    //     console.log('onAuthStateChange')
    //     if (session) {
    //         console.log('session')
    //         const { data } = await supabase
    //             .from('Users')
    //             .select()
    //             .eq('uuid', session.user.id)
    //         // console.log(data)
    //         data !== null && data !== undefined  && data.length
    //             ? setUserProfile(data[0])
    //             : setUserProfile(session.user)
    //         return
    //     } else {
    //         return setUserProfile(null)
    //     }
    // })

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
    // console.log(object)

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

const readUserData = async (rute, uuid, updateContext, eq,) => {
    const result = await supabase
        .from(rute)
        .select()
        .eq(eq ? eq : 'uuid', uuid)

    if (updateContext) {
        result.data !== null && result.data.length !== 0
            ? (result.data.lenght > 1 ? updateContext(result.data[0]) : updateContext(result.data))
            : updateContext(null)
    }
    console.log(result)
    return result.data
}

// result.data !== null && result.data.length !== 0 
// ? ( result.data.lenght > 1 ? result.data[0] :  result.data )
// : null
const readUserAllData = async (rute, context, updateContext) => {

    const result = await supabase
        .from(rute)
        .select()

    return updateContext(result.data)

}

const updateUserData = async (rute, object, uuid, eq) => {
    const result = await supabase
        .from(rute)
        .update(object)
        .eq(eq ? eq : 'uuid', uuid)
    // if (result.data !== null && result.data.length !== 0) {
    //     console.log('act')
    //     key ? updateContext({ ...context, [key]: result.data[0] }) : updateContext(arr == true ? result.data : result.data[0])
    // } 
    console.log(result)
}


const deleteUserData = async (rute, uuid, eq) => {
    const { error } = await supabase
        .from(rute)
        .delete()
        .eq(eq ? eq : 'uuid', uuid)


}






export { onAuth, signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut, passwordResset, passwordRedirect, writeUserData, readUserData, deleteUserData, updateUserData, readUserAllData }

