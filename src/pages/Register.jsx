import axios from "axios";
import FormInput from "./FormInput";
import "./register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const [formErrors, setFormErrors] = useState();

const Register = () => {
    // to reach the values object inside register boxes cuz its object ({})
    const [values, setValues] = useState({
        username:"",
        password:"",
        pin:"",
       // email:"",
    });

    const navigate = useNavigate()

//inputs array for username, password, pin
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
       /* {
            id:4,
            name:"email",
            type:"text",
            placeholder:"E-mail",
            errorMessage:"Enter a valid E-mail",
            label:"E-mail",
            pattern:"/^[A-Z0-9. _%+-]+@[A-Z0-9.]+$/i",
            required: true,
        }*/
    ]
  // Saving as FormData in congole log when submit 
    const handleSubmit = (e) => {
        e.preventDefault();
            let errors = {};
            let hasErrors = false;
        
            // loop through inputs and validate
            inputs.forEach((input) => {
                const value = values[input.name];
                const pattern = new RegExp(input.pattern);
                const isValid = pattern.test(value);
        
                if (!isValid) {
                    errors[input.name] = input.errorMessage;
                    hasErrors = true;
                }
            });
        
            // set form errors
            setFormErrors(errors);
        
            // if there are errors, don't submit form
            if (hasErrors) {
                return;
            }
        
            /*  const data = new FormData(e.target)
            console.log(Object.fromEntries(data.entries()))*/
        
            };
        }

  /*  const data = new FormData(e.target)
    console.log(Object.fromEntries(data.entries()))*/

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });

    }
   
    const handleClick = async e =>{
        e.preventDefault();
        try {
            //what if our end point change
            await axios.post("http://localhost:3003/users", values)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(values);
    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values.name} onChange={onChange}/>
                    ))}
                <button onClick={handleClick}>Submit</button>
            </form>
        </div>
        
    )
};
export default Register
