import axios from "axios";
import FormInput from "./FormInput";
import "./register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [values, setValues] = useState({
        username:"",
        password:"",
        pin:"",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        pin: ""
    });

    const navigate = useNavigate();

    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage:"Username should be 3-16 characters and shouldn't include any numbers or special character!",
            label:"Username",
            pattern: "^[A-Za-z]{3,16}$",
            required: true,
        },
        {
            id:2,
            name:"password",
            type:"text",
            placeholder:"Password",
            errorMessage:"Password should be 8-20 characters and must include 1 letter 1 number and 1 special character!",
            label:"Password",
            pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*;])[A-Za-z0-9!@#$%^&*;]{8,20}$",
            required: true,
        },
        {
            id:3,
            name:"pin",
            type:"password",
            placeholder:"Pin",
            errorMessage:"Pin must be 4 digits",
            label:"Pin",
            pattern:"^[0-9]{4}$",
            required: true,
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateInputs();
        if (isValid) {
            handleClick();
        }
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: ""});
    };

    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", values)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    };

    const validateInputs = () => {
        let isValid = true;
        inputs.forEach((input) => {
            if (input.required && !values[input.name]) {
                setErrors({...errors, [input.name]: "This field is required"});
                isValid = false;
            } else if (values[input.name] && !new RegExp(input.pattern).test(values[input.name])) {
                setErrors({...errors, [input.name]: input.errorMessage});
                isValid = false;
            }
        });
        return isValid;
    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values.name} onChange={onChange} error={errors[input.name]}/>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )
};

export default Register;
