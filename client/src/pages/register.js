import React,{useState} from 'react'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {register} from '../store/actions/actionAuth'
import Button from '../components/button/button'
import Container from '../components/container/container'
import FormInput from '../components/input/form.input'

const Register = ({register}) => {
    const [dataInput, setDataInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {name, email, password, confirmPassword} = dataInput
    const handleChange = (name) => (event) => {
        setDataInput({...dataInput, [name]: event.target.value})
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password do not match!')
        }else{
            register({name, email, password})
        }
    } 

    return (
        <Container>
            <form 
                className="bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 md:w-1/2 lg:w-1/3 mx-auto"
                onSubmit={onSubmit}
            >
                <h2 className="font-bold text-3xl text-center mb-5">Register</h2>
                <FormInput
                    title="Name"
                    placeholder="Dandi Husni"
                    value={name}
                    handleChange={handleChange('name')}
                    type="text"
                />
                <FormInput
                    title="Email"
                    placeholder="example@mail.com"
                    value={email}
                    handleChange={handleChange('email')}
                    type="email"
                />
                <FormInput
                    title="Password"
                    placeholder="*******"
                    value={password}
                    handleChange={handleChange('password')}
                    type="password"
                />
                <FormInput
                    title="Confirm Password"
                    placeholder="*******"
                    value={confirmPassword}
                    handleChange={handleChange('confirmPassword')}
                    type="password"
                />
                <Button
                    title="SignUp"
                    moreStyle="bg-primary text-white w-full mb-3"
                    type="submit"
                />
                <div className="flex justify-end w-full">
                    <Button
                        isButton={false}
                        title="already have an account?"
                        href="/login"
                        moreStyle="text-gray-600"
                    />
                </div>
            </form>
        </Container>

    )
}

export default connect(null, {register})(Register)
