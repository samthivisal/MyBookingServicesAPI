import * as firebase from 'firebase';

export default async function createUser(email, password) {
    return new Promise(resolve => {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            if (error) {
                return resolve({haveError: true, message: error.message})
            }

            resolve({haveError: false})
        });
    })
}