import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './UserForm.module';


let UserForm = props => {
    const { iden, handleSubmit, buttonLabel } = props
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div >
                <label htmlFor="name">Name</label>
                <Field className={styles.fieldName} name={"name"+iden} component="input" type="text" />
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <Field  className={styles.fieldAge} name={"age"+iden} component="input" type="number" />
            </div>

            <button className={styles.formButton} type="submit">{buttonLabel}</button>
        </form>
    );  
}

UserForm = reduxForm({
    // a unique name for the form
    form: 'userForm'
})(UserForm);

export default UserForm
